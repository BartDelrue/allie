let naviDrawer = (() => {
  'use strict';

  let overlay = document.querySelector('[data-modal-overlay');
  let triggers = document.querySelectorAll('input[type=button][data-modal-trigger], button[data-modal-trigger');
  let closeBtns = document.querySelectorAll('[data-modal-close');
  let trigger, target, focusableElems;
  let focusPosition = -1;
  let bodyChildren = document.querySelectorAll('body > *:not([data-modal])');

  let smooth = true;
  let duration = 0.75;

  let setDuration = function (d) {
    duration = d;
  };
  let isSmooth = function (bool) {
    smooth = (bool === true);
  };

  Math.easeInQuad = function (t, b, c, d) {
    t /= d;
    return c * t * t * t + b;
  };

  let naviTriggers = document.querySelectorAll('input[type=button][data-navi-drawer-trigger], button[data-navi-drawer-trigger');

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
        closeModal(e);
      }

    }

  };

  let openDrawer = (e) => {

    if (e) e.preventDefault();

    trigger = e.target;
    target = document.querySelector('nav[data-navi-drawer]');

    if (target) {

      if (smooth) {

        target.style.display = 'block';
        let width = target.getBoundingClientRect().width;

        target.style.left = -width + 'px';

        let open = function (target, t) {
          let left = -(width - Math.easeInQuad(t, 0, width, duration));

          if (left >= 0) {
            target.removeAttribute('style');
            clearInterval(openNavi);
          }
          else
            target.style.left = left + 'px';
        };

        let t = 0;
        let openNavi = setInterval(function () {
            open(target, (++t * 100) / 1000);
          }, 50
        );
      }
      target.className += ' navi-drawer--visible';


      // target.hidden = !modalTarget.hidden;
      // target.hidden = !modalOverlay.hidden;
      // target.tabIndex = -1;
      // target.focus();
      //
      // focusableElems = modalTarget.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
      // focusableElems = Array.prototype.slice.call(focusableElems);
      //
      // document.addEventListener('keydown', handleKeyboardInput);

      bodyChildren.forEach(child => {
        child.setAttribute('aria-hidden', true);
      });
    }
  };

  let closeModal = (e) => {

    if (e) e.preventDefault();

    modalTarget.hidden = true;
    modalOverlay.hidden = true;

    document.removeEventListener('keydown', handleKeyboardInput);

    bodyChildren.forEach(child => {
      child.setAttribute('aria-hidden', false);
    });

    modalTrigger.focus();
  };

  naviTriggers.forEach(trigger => {
    trigger.addEventListener('click', openDrawer);
  });

  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', closeModal);
  });

  if (overlay)
    overlay.addEventListener('click', closeModal);


  return {
    setDuration, isSmooth
  };
})();

module.exports = naviDrawer;
