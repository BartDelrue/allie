/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by Bart on 20/05/2017.
	 */

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	(() => {
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

	      focusableElems = modalTarget.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
	      focusableElems = Array.prototype.slice.call(focusableElems);

	      document.addEventListener('keydown', handleKeyboardInput);

	      bodyChildren.forEach(child=>{
	        child.setAttribute('aria-hidden',true);
	      })
	    }
	  };

	  let closeModal = (e) => {

	    if (e) e.preventDefault();

	    modalTarget.hidden = true;
	    modalOverlay.hidden = true;

	    document.removeEventListener('keydown', handleKeyboardInput);

	    bodyChildren.forEach(child=>{
	      child.setAttribute('aria-hidden',false);
	    });

	    modalTrigger.focus();
	  };

	  modalTriggers.forEach(modal => {
	    modal.addEventListener('click', openModal);
	  });

	  closeBtns.forEach(closeBtn => {
	    closeBtn.addEventListener('click', closeModal);
	  });

	  modalOverlay.addEventListener('click', closeModal);

	})();







/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/**
	 * Created by Bart on 20/05/2017.
	 */


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/**
	 * Created by Bart on 20/05/2017.
	 */


/***/ })
/******/ ]);