let modal = (() => {
  'use strict';

  let modalOverlay = document.querySelector('[data-modal-overlay');
  let modalTriggers = document.querySelectorAll('input[type=button][data-modal-trigger], button[data-modal-trigger');
  let closeBtns = document.querySelectorAll('[data-modal-close');
  let modalTrigger, modalTarget, focusableElems;
  let focusPosition = -1;
  let bodyChildren = document.querySelectorAll('body > *:not([data-modal])');

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

  let openModal = (e) => {

    if (e) e.preventDefault();

    modalTrigger = e.target;
    modalTarget = document.querySelector('#' + modalTrigger.getAttribute('data-modal-target'));

    if (modalTarget) {
      modalTarget.hidden = !modalTarget.hidden;
      modalOverlay.hidden = !modalOverlay.hidden;
      modalTarget.tabIndex = -1;
      modalTarget.focus();

      focusableElems = modalTarget.querySelectorAll('a[href], area[href], input:not([disabled]):not([hidden]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
      focusableElems = Array.prototype.slice.call(focusableElems);

      document.addEventListener('keydown', handleKeyboardInput);

      for(let i = bodyChildren.length; i>0; i--)
        bodyChildren[i-1].setAttribute('aria-hidden', true);
    }
  };

  let closeModal = (e) => {

    if (e) e.preventDefault();

    modalTarget.hidden = true;
    modalOverlay.hidden = true;

    document.removeEventListener('keydown', handleKeyboardInput);

    for(let i = bodyChildren.length; i>0; i--)
      bodyChildren[i-1].setAttribute('aria-hidden', false);

    modalTrigger.focus();

  };

  for (let i = modalTriggers.length; i > 0; i--)
    modalTriggers[i - 1].addEventListener('click', openModal);

  for (let i = closeBtns.length; i > 0; i--)
    closeBtns[i - 1].addEventListener('click', closeModal);


  if (modalOverlay)
    modalOverlay.addEventListener('click', closeModal);


  return {};
})();

module.exports = modal;




