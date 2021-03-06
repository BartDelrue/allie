module.exports = (() => {
  'use strict';


  let components = document.querySelectorAll('[data-tabs]');

  let changeTab = (tab, tabs, tabpanels, component, init) => {

    for (let i = tabs.length; i > 0; i--) {
      tabs[i - 1].setAttribute('aria-selected', false);
      tabs[i - 1].tabIndex = -1;
    }

    tab.setAttribute('aria-selected', true);
    tab.tabIndex = 0;

    for (let i = tabpanels.length; i > 0; i--)
      tabpanels[i - 1].setAttribute('aria-hidden', true);

    let tabpanel = component.querySelector(tab.hash);
    if (tabpanel) {
      tabpanel.setAttribute('aria-hidden', false);

      if (!init) {
        if (history.pushState)
          history.pushState(null, null, tab.hash);
        else
          window.location.hash = tab.hash;
        tab.focus();
      }

    }
  };

  let handleKeyboardInput = (e, tabs) => {

    let keyCode = e.keyCode || e.which;
    let tab = e.target;

    let next = () => {
      for (let i = tabs.length; i > 0; i--) {
        if (tabs[i - 1] === tab) {
          e.preventDefault();
          let tab = tabs[i] ? tabs[i] : tabs[0];
          tab.focus();
          tab.click();
        }
      }
    };

    let previous = () => {
      for (let i = tabs.length; i > 0; i--) {
        if (tabs[i - 1] === tab) {
          let tab = tabs[i - 2] ? tabs[i - 2] : tabs[tabs.length - 1];
          e.preventDefault();
          tab.focus();
          tab.click();
        }
      }
    };

    let end = () => {

      e.preventDefault();
      tabs[tabs.length - 1].focus();
      tabs[tabs.length - 1].click();

    };

    let home = () => {

      e.preventDefault();
      tabs[0].focus();
      tabs[0].click();
    };

    let setfocus = () => {
      let tabpanel = document.querySelector(tab.hash);
      if (tabpanel && !e.shiftKey) {
        e.preventDefault();
        if (history.pushState)
          history.pushState(null, null, tab.hash);
        else
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
      case 13:
        setfocus();
        break;
    }

  };

  let initTabs = (component) => {

    let hash = window.location.hash;

    let tablist = component.querySelector('ul[role=tablist]');
    let tabs = tablist.querySelectorAll('li[role=presentation]>a[role=tab]');
    let tabpanels = component.querySelectorAll('[role=tabpanel]');


    for (let i = tabs.length; i > 0; i--) {
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

    for (let i = tabpanels.length; i > 0; i--) {
      tabpanels[i - 1].setAttribute('aria-hidden', true);
    }


    if (hash) {
      let tab = tablist.querySelector('[href="' + hash + '"]');

      if (tab)
        tab.click();
      else
        changeTab(tabs[0], tabs, tabpanels, component, true);
    }
    else {
      changeTab(tabs[0], tabs, tabpanels, component, true);
    }
  };

  for (let i = components.length; i > 0; i--)
    initTabs(components[i - 1]);
})
();
