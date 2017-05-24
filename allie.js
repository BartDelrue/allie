var myLibrary =
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

	module.exports = {
	  accordion: __webpack_require__(1),
	  modal: __webpack_require__(2),
	  naviDrawer: __webpack_require__(3),
	  tabs: __webpack_require__(4)
	};



/***/ }),
/* 1 */
/***/ (function(module, exports) {

	

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

	      focusableElems = modalTarget.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
	      focusableElems = Array.prototype.slice.call(focusableElems);

	      document.addEventListener('keydown', handleKeyboardInput);

	      bodyChildren.forEach(child=>{
	        child.setAttribute('aria-hidden',true);
	      });
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

	  if(modalOverlay)
	  modalOverlay.addEventListener('click', closeModal);


	  return {};
	})();

	module.exports = modal;






/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/**
	 * Created by Bart on 20/05/2017.
	 */


/***/ })
/******/ ]);