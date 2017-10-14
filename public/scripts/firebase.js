'use strict';

window.friendlyPix = window.friendlyPix || {};
friendlyPix.Firebase = class {
  constructor() {
    this.database = firebase.database();
    this.auth = firebase.auth();

    this.firebaseRefs = [];
  }
  cancelAllSubscriptions() {
    this.firebaseRefs.forEach(ref => ref.off());
    this.firebaseRefs = [];
  }
 
  browseFood(){

  }

  home() {
    
  }
};

friendlyPix.firebase = new friendlyPix.Firebase();