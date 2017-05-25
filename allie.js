'use strict';

var allie =
/******/function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.loaded = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	/**
  * Created by Bart on 20/05/2017.
  */

	module.exports = {
		accordion: __webpack_require__(1),
		modal: __webpack_require__(2),
		naviDrawer: __webpack_require__(3),
		tabs: __webpack_require__(4)
	};

	/***/
},
/* 1 */
/***/function (module, exports) {

	/***/},
/* 2 */
/***/function (module, exports) {

	var modal = function () {
		'use strict';

		var modalOverlay = document.querySelector('[data-modal-overlay');
		var modalTriggers = document.querySelectorAll('input[type=button][data-modal-trigger], button[data-modal-trigger');
		var closeBtns = document.querySelectorAll('[data-modal-close');
		var modalTrigger = void 0,
		    modalTarget = void 0,
		    focusableElems = void 0;
		var focusPosition = -1;
		var bodyChildren = document.querySelectorAll('body > *:not([data-modal])');

		var handleKeyboardInput = function handleKeyboardInput(e) {

			if (focusableElems && e) {
				var keyCode = e.keyCode || e.which;

				if (keyCode === 9) {
					e.preventDefault();

					var next = void 0;
					if (e.shiftKey) {
						if (--focusPosition < 0) focusPosition = focusableElems.length - 1;
						next = focusableElems[focusPosition];
					} else {
						if (++focusPosition > focusableElems.length - 1) focusPosition = 0;
						next = focusableElems[focusPosition];
					}

					next.focus();
				} else if (keyCode === 27) {
					closeModal(e);
				}
			}
		};

		var openModal = function openModal(e) {

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

				for (var i = bodyChildren.length; i > 0; i--) {
					bodyChildren[i - 1].setAttribute('aria-hidden', true);
				}
			}
		};

		var closeModal = function closeModal(e) {

			if (e) e.preventDefault();

			modalTarget.hidden = true;
			modalOverlay.hidden = true;

			document.removeEventListener('keydown', handleKeyboardInput);

			for (var i = bodyChildren.length; i > 0; i--) {
				bodyChildren[i - 1].setAttribute('aria-hidden', false);
			}modalTrigger.focus();
		};

		for (var i = modalTriggers.length; i > 0; i--) {
			modalTriggers[i - 1].addEventListener('click', openModal);
		}for (var _i = closeBtns.length; _i > 0; _i--) {
			closeBtns[_i - 1].addEventListener('click', closeModal);
		}if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

		return {};
	}();

	module.exports = modal;

	/***/
},
/* 3 */
/***/function (module, exports) {

	module.exports = function () {
		'use strict';

		var overlay = document.querySelector('[data-navi-drawer-overlay]');
		var triggers = document.querySelectorAll('input[type=button][data-navi-drawer-trigger], button[data-navi-drawer-trigger]');
		var closeBtns = document.querySelectorAll('[data-navi-drawer-close]');
		var drawer = document.querySelector('nav[data-navi-drawer]');
		var bodyChildren = document.querySelectorAll('body > *:not([data-navi-drawer])');

		var trigger = void 0,
		    focusableElems = void 0,
		    width = void 0,
		    closeNavi = void 0,
		    openNavi = void 0;

		var startPos = 0;
		var focusPosition = -1;

		var smooth = true;
		var duration = 0.75;
		var threshold = 480;
		var swipeEnabled = true;

		var setDuration = function setDuration(d) {
			duration = d;
		};
		var setTreshhold = function setTreshhold(t) {
			threshold = t;
		};
		var isSmooth = function isSmooth(bool) {
			smooth = bool === true;
		};

		//http://gizma.com/easing/
		Math.easeInQuad = function (t, b, c, d) {
			t /= d;
			return c * t * t * t + b;
		};

		Math.easeOutQuad = function (t, b, c, d) {
			t /= d;
			return -c * t * (t - 2) + b;
		};
		//


		var handleKeyboardInput = function handleKeyboardInput(e) {

			if (focusableElems && e) {
				var keyCode = e.keyCode || e.which;

				if (keyCode === 9) {
					e.preventDefault();

					var next = void 0;
					if (e.shiftKey) {
						if (--focusPosition < 0) focusPosition = focusableElems.length - 1;
						next = focusableElems[focusPosition];
					} else {
						if (++focusPosition > focusableElems.length - 1) focusPosition = 0;
						next = focusableElems[focusPosition];
					}

					next.focus();
				} else if (keyCode === 27) {
					closeDrawer(e);
				}
			}
		};

		var open = function open(target, t, isIn, next) {
			var left = Math.easeOutQuad(t, startPos, width, duration);

			if (left >= width && next) next(isIn);else target.style.left = isIn ? -(width - left) + 'px' : -left + 'px';
		};

		var fade = function fade(elem, t, isIn, next) {

			var opacity = Math.easeOutQuad(t, 0, 1, duration);

			if (opacity >= 1 && next) next(isIn);else elem.style.opacity = isIn ? opacity : 1 - opacity;
		};

		var animationFinished = function animationFinished(isOpen) {
			drawer.removeAttribute('style');
			overlay.removeAttribute('style');
			if (closeNavi) clearInterval(closeNavi);
			if (openNavi) clearInterval(openNavi);
			startPos = 0;

			overlay.hidden = !isOpen;
			drawer.hidden = !isOpen;
		};

		var openDrawer = function openDrawer(e) {

			if (e) {
				e.preventDefault();
				trigger = e.target;
				trigger.setAttribute('aria-expanded', true);
			}

			if (drawer && overlay) {

				drawer.hidden = false;
				overlay.hidden = false;

				if (smooth) {

					width = drawer.getBoundingClientRect().width;
					drawer.style.left = -width + startPos + 'px';
					overlay.style.opacity = 0;

					var t = 0;
					openNavi = setInterval(function () {
						open(drawer, ++t * 50 / 1000, true, animationFinished);
						fade(overlay, ++t * 50 / 1000, true, animationFinished);
					}, 50);
				}

				drawer.className += ' navi-drawer--visible';
				drawer.tabIndex = -1;
				drawer.focus();
				overlay.addEventListener('click', closeDrawer);

				focusableElems = drawer.querySelectorAll('a[href], area[href], input:not([disabled]):not([hidden]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
				focusableElems = Array.prototype.slice.call(focusableElems);

				document.addEventListener('keydown', handleKeyboardInput);

				for (var i = bodyChildren.length; i > 0; i--) {
					bodyChildren[i - 1].setAttribute('aria-hidden', true);
				}
			}
		};

		var closeDrawer = function closeDrawer(e) {

			document.removeEventListener('keydown', handleKeyboardInput);

			if (e) e.preventDefault();

			if (drawer && overlay) {
				overlay.removeEventListener('click', closeDrawer);

				if (smooth) {

					var t = 0;
					closeNavi = setInterval(function () {
						open(drawer, ++t * 50 / 1000, false, animationFinished);
						fade(overlay, ++t * 50 / 1000, false, animationFinished);
					}, 50);
				} else {
					overlay.hidden = true;
					drawer.hidden = true;
					drawer.classList.remove('navi-drawer--visible');
				}

				document.removeEventListener('keydown', handleKeyboardInput);

				for (var i = bodyChildren.length; i > 0; i--) {
					bodyChildren[i - 1].setAttribute('aria-hidden', false);
				}if (trigger) {
					trigger.setAttribute('aria-expanded', false);
					trigger.focus();
					trigger = null;
				} else {
					document.querySelector('main').tabIndex = -1;
					document.querySelector('main').focus();
				}
			}
		};

		var swipeDrawer = function swipeDrawer(e) {
			var pos = e.changedTouches[0].pageX;
			drawer.style.left = -width + pos + 'px';

			if (pos > 80 || pos >= width) {
				startPos = 80;
				document.removeEventListener('touchmove', swipeDrawer);
				openDrawer();
			}
		};

		for (var i = triggers.length; i > 0; i--) {
			triggers[i - 1].addEventListener('click', openDrawer);
		}for (var _i2 = closeBtns.length; _i2 > 0; _i2--) {
			closeBtns[_i2 - 1].addEventListener('click', closeDrawer);
		}var enableSwipe = function enableSwipe(enable, width) {

			swipeEnabled = enable === true;
			threshold = width ? width : threshold;

			if (enable && drawer) {

				document.addEventListener('touchstart', function (e) {
					if (!swipeEnabled || window.innerWidth > threshold) return;
					var pos = e.changedTouches[0].pageX;

					if (pos <= 15) {

						drawer.hidden = false;
						width = drawer.getBoundingClientRect().width;
						drawer.style.left = -width + 'px';
						drawer.className += ' navi-drawer--visible';

						document.addEventListener('touchmove', swipeDrawer);
					} else document.removeEventListener('touchmove', swipeDrawer);
				});
			}
		};

		return {
			setDuration: setDuration, isSmooth: isSmooth, enableSwipe: enableSwipe
		};
	}();

	/***/
},
/* 4 */
/***/function (module, exports) {

	module.exports = function () {
		'use strict';

		var components = document.querySelectorAll('[data-tabs]');

		var changeTab = function changeTab(tab, tabs, tabpanels, component, init) {

			for (var i = tabs.length; i > 0; i--) {
				tabs[i - 1].setAttribute('aria-selected', false);
				tabs[i - 1].tabIndex = -1;
			}

			tab.setAttribute('aria-selected', true);
			tab.tabIndex = 0;

			for (var _i3 = tabpanels.length; _i3 > 0; _i3--) {
				tabpanels[_i3 - 1].setAttribute('aria-hidden', true);
			}var tabpanel = component.querySelector(tab.hash);
			if (tabpanel) {
				tabpanel.setAttribute('aria-hidden', false);
				if (!init) {
					window.location.hash = tab.hash;
					tab.focus();
				}
			}
		};

		var handleKeyboardInput = function handleKeyboardInput(e, tabs) {

			var keyCode = e.keyCode || e.which;
			var tab = e.target;

			var next = function next() {
				for (var i = tabs.length; i > 0; i--) {
					if (tabs[i - 1] === tab) {
						e.preventDefault();
						var _tab = tabs[i] ? tabs[i] : tabs[0];
						_tab.focus();
						_tab.click();
					}
				}
			};

			var previous = function previous() {
				for (var i = tabs.length; i > 0; i--) {
					if (tabs[i - 1] === tab) {
						var _tab2 = tabs[i - 2] ? tabs[i - 2] : tabs[tabs.length - 1];
						e.preventDefault();
						_tab2.focus();
						_tab2.click();
					}
				}
			};

			var end = function end() {

				e.preventDefault();
				tabs[tabs.length - 1].focus();
				tabs[tabs.length - 1].click();
			};

			var home = function home() {

				e.preventDefault();
				tabs[0].focus();
				tabs[0].click();
			};

			var setfocus = function setfocus() {
				var tabpanel = document.querySelector(tab.hash);
				if (tabpanel && !e.shiftKey) {
					e.preventDefault();
					window.location.hash = tab.hash;
				}
			};

			switch (keyCode) {
				case 37:
					previous();
					break;
				case 38:
					previous();
					break;
				case 40:
					next();
					break;
				case 39:
					next();
					break;
				case 36:
					home();
					break;
				case 35:
					end();
					break;
				case 9:
					setfocus();
					break;
				case 13:
					setfocus();
					break;
			}
		};

		var initTabs = function initTabs(component) {

			var hash = window.location.hash;

			var tablist = component.querySelector('ul[role=tablist]');
			var tabs = tablist.querySelectorAll('li[role=presentation]>a[role=tab]');
			var tabpanels = component.querySelectorAll('[role=tabpanel]');

			for (var i = tabs.length; i > 0; i--) {
				tabs[i - 1].setAttribute('aria-selected', false);
				tabs[i - 1].setAttribute('aria-controls', tabs[i - 1].hash.substr(1));
				tabs[i - 1].addEventListener('click', function (e) {
					e.preventDefault();
					changeTab(e.target, tabs, tabpanels, component);
				});
				tabs[i - 1].addEventListener('keydown', function (e) {
					handleKeyboardInput(e, tabs);
				});
			}

			for (var _i4 = tabpanels.length; _i4 > 0; _i4--) {
				tabpanels[_i4 - 1].setAttribute('aria-hidden', true);
			}

			if (hash) {
				var tab = tablist.querySelector('[href="' + hash + '"]');

				if (tab) tab.click();else changeTab(tabs[0], tabs, tabpanels, component, true);
			} else {

				changeTab(tabs[0], tabs, tabpanels, component, true);
			}
		};

		for (var i = components.length; i > 0; i--) {
			initTabs(components[i - 1]);
		}
	}();

	/***/
}]);