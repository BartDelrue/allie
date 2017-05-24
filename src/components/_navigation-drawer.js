let naviDrawer = (() => {
  'use strict';

  let overlay = document.querySelector('[data-navi-drawer-overlay]');
  let triggers = document.querySelectorAll('input[type=button][data-navi-drawer-trigger], button[data-navi-drawer-trigger]');
  let closeBtns = document.querySelectorAll('[data-navi-drawer-close]');
  let drawer = document.querySelector('nav[data-navi-drawer]');
  let trigger, focusableElems;
  let startPos = 0;
  let focusPosition = -1;
  let bodyChildren = document.querySelectorAll('body > *:not([data-navi-drawer])');

  let smooth = true;
  let duration = 0.75;
  let treshhold = 480;
  let width, closeNavi, openNavi;

  let setDuration = (d) => {
    duration = d;
  };
  let setTreshhold = (t) => {
    treshhold = t;
  };
  let isSmooth = (bool) => {
    smooth = (bool === true);
  };

  //http://gizma.com/easing/
  Math.easeInQuad = (t, b, c, d) => {
    t /= d;
    return c * t * t * t + b;
  };

  Math.easeOutQuad = (t, b, c, d) => {
    t /= d;
    return -c * t * (t - 2) + b;
  };
  //


  let handleKeyboardInput = (e) => {

    if (focusableElems && e) {
      let keyCode = e.keyCode || e.which;

      if (keyCode === 9) {
        e.preventDefault();

        let next;
        if (e.shiftKey) {
          if (--focusPosition < 0) focusPosition = focusableElems.length - 1;
          next = focusableElems[focusPosition];
        }
        else {
          if (++focusPosition > focusableElems.length - 1) focusPosition = 0;
          next = focusableElems[focusPosition];
        }

        next.focus();
      }
      else if (keyCode === 27) {
        closeDrawer(e);
      }

    }

  };

  let open = (target, t, isIn, next) => {
    let left = Math.easeOutQuad(t, startPos, width, duration);

    if (left >= width && next)
      next(isIn);
    else target.style.left = isIn ? -(width - left) + 'px' : -left + 'px';
  };

  let fade = (elem, t, isIn, next) => {

    let opacity = Math.easeOutQuad(t, 0, 1, duration);

    if (opacity >= 1 && next)
      next(isIn);
    else elem.style.opacity = isIn ? opacity : 1 - opacity;

  };

  let animationFinished = (isOpen) => {
    drawer.removeAttribute('style');
    overlay.removeAttribute('style');
    if (closeNavi) clearInterval(closeNavi);
    if (openNavi) clearInterval(openNavi);
    startPos = 0;

    overlay.hidden = !isOpen;
    drawer.hidden = !isOpen;
  };

  let openDrawer = (e) => {

    if (e) {
      e.preventDefault();
      trigger = e.target;
    }

    if (drawer && overlay) {

      drawer.hidden = false;
      overlay.hidden = false;

      if (smooth) {

        width = drawer.getBoundingClientRect().width;
        drawer.style.left = -width + startPos + 'px';
        overlay.style.opacity = 0;

        let t = 0;
        openNavi = setInterval(() => {
            open(drawer, (++t * 50) / 1000, true, animationFinished);
            fade(overlay, (++t * 50) / 1000, true, animationFinished);
          }, 50
        );
      }

      drawer.className += ' navi-drawer--visible';
      drawer.tabIndex = -1;
      drawer.focus();
      overlay.addEventListener('click', closeDrawer);

      focusableElems = drawer.querySelectorAll('a[href], area[href], input:not([disabled]):not([hidden]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
      focusableElems = Array.prototype.slice.call(focusableElems);

      document.addEventListener('keydown', handleKeyboardInput);

      for(let i = bodyChildren.length; i>0; i--)
        bodyChildren[i-1].setAttribute('aria-hidden', true);

    }
  };

  let closeDrawer = (e) => {

    document.removeEventListener('keydown', handleKeyboardInput);

    if (e) e.preventDefault();

    if (drawer && overlay) {
      overlay.removeEventListener('click', closeDrawer);

      if (smooth) {

        let t = 0;
        closeNavi = setInterval(() => {
            open(drawer, (++t * 50) / 1000, false, animationFinished);
            fade(overlay, (++t * 50) / 1000, false, animationFinished);
          }, 50
        );
      }
      else {
        overlay.hidden = true;
        drawer.hidden = true;
        drawer.classList.remove('navi-drawer--visible');
      }

      document.removeEventListener('keydown', handleKeyboardInput);

      for(let i = bodyChildren.length; i>0; i--)
        bodyChildren[i-1].setAttribute('aria-hidden', false);

      if(trigger){
        trigger.focus();
        trigger = null;
      }
      else{
        document.querySelector('main').tabIndex = -1;
        document.querySelector('main').focus();
      }

    }
  };

  let swipeDrawer = (e)=>{
    let pos = e.changedTouches[0].pageX;
    drawer.style.left = (-width+pos)  + 'px';

    if(pos > 80 || pos >= width){
      startPos = 80;
      document.removeEventListener('touchmove', swipeDrawer);
      openDrawer()
    }
  };

  for (let i = triggers.length; i > 0; i--)
    triggers[i - 1].addEventListener('click', openDrawer);

  for (let i = closeBtns.length; i > 0; i--)
    closeBtns[i - 1].addEventListener('click', closeDrawer);


  if (drawer) {
    document.addEventListener('touchstart', (e) => {
      let pos = e.changedTouches[0].pageX;

      if(pos <= 15){

        drawer.hidden = false;
        width = drawer.getBoundingClientRect().width;
        drawer.style.left = -width + 'px';
        drawer.className += ' navi-drawer--visible';

        document.addEventListener('touchmove', swipeDrawer);
      }
      else
        document.removeEventListener('touchmove', swipeDrawer);
    });
  }

  return {
    setDuration, isSmooth
  };
})();

module.exports = naviDrawer;
