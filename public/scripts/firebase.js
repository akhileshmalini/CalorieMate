/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

window.friendlyPix = window.friendlyPix || {};

/**
 * Handles all Firebase interactions.
 */
friendlyPix.Firebase = class {
 

 
  /**
   * Initializes this Firebase facade.
   * @constructor
   */
  constructor() {
    // Firebase SDK.
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.auth = firebase.auth();

    // Firebase references that are listened to.
    this.firebaseRefs = [];
  }

  /**
   * Turns off all Firebase listeners.
   */
  cancelAllSubscriptions() {
    this.firebaseRefs.forEach(ref => ref.off());
    this.firebaseRefs = [];
  }
 
  browseFood(){

  }

  home() {
    
  }

/*
  /**
   * Saves or updates public user data in Firebase (such as image URL, display name...).
   *
  saveUserData(imageUrl, displayName) {
    if (!displayName) {
      displayName = 'Anonymous';
    }
    let searchFullName = displayName.toLowerCase();
    let searchReversedFullName = searchFullName.split(' ').reverse().join(' ');
    try {
      searchFullName = latinize(searchFullName);
      searchReversedFullName = latinize(searchReversedFullName);
    } catch (e) {
      console.error(e);
    }

    const updateData = {
      profile_picture: imageUrl,
      full_name: displayName,
      _search_index: {
        full_name: searchFullName,
        reversed_full_name: searchReversedFullName
      }
    };
    return this.database.ref(`people/${this.auth.currentUser.uid}`).update(updateData);
  }
*/



};

friendlyPix.firebase = new friendlyPix.Firebase();
