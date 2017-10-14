'use strict';

window.friendlyPix = window.friendlyPix || {};
friendlyPix.Router = class {

  constructor() {
    $(document).ready(() => {
      friendlyPix.auth.waitForAuth.then(() => {
        this.pagesElements = $('[id^=page-]');
        this.splashLogin = $('#page-splash');

        if (window.location.pathname === '/add') {
          page('/');
        }

        const pipe = friendlyPix.Router.pipe;
        const displayPage = this.displayPage.bind(this);
        const clearFeed = () => friendlyPix.feed.clear();
        const goHome = () => friendlyPix.firebase.home();
        const browse = () => friendlyPix.firebase.browseFood();
        const loadProfile = () => friendlyPix.auth.loadProfile();
        const logout = () => friendlyPix.auth.signOutHandler();

        page('/home', pipe(goHome, null, true), pipe(displayPage, {pageId: 'home', onlyAuthed: true}));
        page('/browse', pipe(browse, null, true), pipe(displayPage, {pageId: 'browse', onlyAuthed: true}));
        page('/profile', pipe(loadProfile, null, true), pipe(displayPage, {pageId: 'profile', onlyAuthed: true}));
        page('/logout', pipe(logout, null, true), pipe(displayPage, {pageId: ''}));
        page();
      });
    });
  }

  displayPage(attributes, context) {
    const onlyAuthed = attributes.onlyAuthed;
      let pageId = attributes.pageId;

    if (onlyAuthed && !firebase.auth().currentUser) {
      pageId = 'splash';
      this.splashLogin.show();
    }
    friendlyPix.Router.setLinkAsActive(context.canonicalPath);
    this.pagesElements.each(function(index, element) {
      if (element.id === 'page-' + pageId) {
        console.log(element);
        $(element).show();
      } else {
        $(element).hide();
        console.log(element);        
      }
    });
    console.log(window.location.pathname);  
    friendlyPix.Router.scrollToTop();
  }

  reloadPage() {
    let path = window.location.pathname;
    page(path);
  }

  /**
   * Scrolls the page to top.
   */
  static scrollToTop() {
    $('html,body').animate({scrollTop: 0}, 0);
  }

  /**
   * Pipes the given function and passes the given attribute and Page.js context.
   * Set 'optContinue' to true if there are further functions to call.
   */
  static pipe(funct, attribute, optContinue) {
    return (context, next) => {
      if (funct) {
        const params = Object.keys(context.params);
        if (!attribute && params.length > 0) {
          funct(context.params[params[0]], context);
        } else {
          funct(attribute, context);
        }
      }
      if (optContinue) {
        next();
      }
    };
  }

  /**
   * Highlights the correct menu item/link.
   */
  static setLinkAsActive(canonicalPath) {
    if (canonicalPath === '') {
      canonicalPath = '/';
    }
    $('.is-active').removeClass('is-active');
    $(`[href="${canonicalPath}"]`).addClass('is-active');
  }
};

friendlyPix.router = new friendlyPix.Router();
