'use strict';

window.friendlyPix = window.friendlyPix || {};

friendlyPix.Auth = class {
  get waitForAuth() {
    return this._waitForAuthPromiseResolver.promise();
  }

  constructor() {
    // Firebase SDK
    this.database = firebase.database();
    this.auth = firebase.auth();
    this._waitForAuthPromiseResolver = new $.Deferred();
    this.signedInState = 0;
    $(document).ready(() => {/*
      // Pointers to DOM Elements
      const signedInUserContainer = $('.fp-signed-in-user-container');
      this.signedInUserAvatar = $('.fp-avatar', signedInUserContainer);
      this.signedInUsername = $('.fp-username', signedInUserContainer);
      this.signOutButton = $('.fp-sign-out');*/
      this.signedOutOnlyElements = $('.fp-signed-out-only');
      this.signedInOnlyElements = $('.fp-signed-in-only');/*
      this.usernameLink = $('.fp-usernamelink');

      // Event bindings
      this.signOutButton.click(() => this.auth.signOut());
      this.signedInOnlyElements.hide();*/

      this.signInButton = $('#login_submit');
      this.signInButton.click(() => this.signInHandler());

      this.signUpButton = $('#signup_submit');
      this.signUpButton.click(() => this.signUpHandler());

      this.signOutButton = $('#logout');
      this.signOutButton.click(() => this.signOutHandler());

      this.passwordResetButton = $('#pass_reset_submit');
      this.passwordResetButton.click(() => this.passwordResetHandler());
    });
    
    
    this.auth.onAuthStateChanged(user => this.onAuthStateChanged(user));
  }

  passwordResetHandler(){
    var email = document.getElementById('pass_reset_email').value;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Email sent.
      // page('/');
      location.reload();
      alert('Password Reset link has been sent to the email address');
    }).catch(function(error) {
      // An error happened.
      $('#pass_reset_error').css('display', '');
      document.getElementById('pass_reset_error').innerHTML = error.errorMessage;
    });
  }

  signUpHandler(){
    // alert('signing up');
    this.email = document.getElementById('signup_user_name').value;
    this.password = document.getElementById('signup_password').value;
    this.dob = document.getElementById('signup_dob').value;
    this.verify_pas = document.getElementById('signup_verify_password').value;
    if (this.email.length < 4) {
      $('#signup_error').css('display', '');
      document.getElementById('signup_error').innerHTML = 'Please enter an email address.';
      return;
    }
    if (this.password.length < 4) {
      $('#signup_error').css('display', '');
      document.getElementById('signup_error').innerHTML = 'Please enter a password.';      
      return;
    }
    if (this.password != this.verify_pas){
      $('#signup_error').css('display', '');
      document.getElementById('signup_error').innerHTML = 'The passwords donot match.';
      return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function(){
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      $('#signup_error').css('display', '');
      if (errorCode == 'auth/weak-password') {
        document.getElementById('signup_error').innerHTML = 'The password is too weak.';
      } else {
        document.getElementById('signup_error').innerHTML = errorMessage;
      }
      return;
      // console.log(error);
      // [END_EXCLUDE]
    });
    // [END createwithemail]
  }
  
  signOutHandler(){
    firebase.auth().signOut();
  }

  signInHandler(){
    this.email = document.getElementById('login_user_name').value;
    this.password = document.getElementById('login_password').value;
    if (this.email.length < 4) {
      $('#signin_error').css('display', '');
      document.getElementById('signin_error').innerHTML = 'Please enter an email address';
      return;
    }
    if (this.password.length < 1){
      $('#signin_error').css('display', '');
      document.getElementById('signin_error').innerHTML = 'Please enter the password';
      return
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
      // Handle Errors here.
      $('#signin_error').css('display', '');
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
      document.getElementById('signin_error').innerHTML = 'Wrong Password';
      }else {
      document.getElementById('signin_error').innerHTML = errorMessage;
      }
      // console.log(error);
      // [END_EXCLUDE]
    });
    
    
    // page('home');
  }

  loadProfile() {
    
  }

  /**
   * Displays the signed-in user information in the UI or hides it and displays the
   * "Sign-In" button if the user isn't signed-in.
   */
  onAuthStateChanged(user) {
    if (window.friendlyPix.router) {
      window.friendlyPix.router.reloadPage();
    }
    this._waitForAuthPromiseResolver.resolve();
    $(document).ready(() => {
      // alert('alert');
      if (!user) {
        // alert('Signed Out');
        this.signedOutOnlyElements.show();
        this.signedInOnlyElements.hide();
        page('/');

        console.log(firebase.auth());

        // this.userId = null;
        // this.signedInUserAvatar.css('background-image', '');
      } else {
        // alert('Signed In');
        // alert(user.uid.toString());
        this.signedOutOnlyElements.hide();
        this.signedInOnlyElements.show();
        document.getElementById('navbar_username').innerHTML = firebase.auth().currentUser.email.toString();
        document.getElementById('navbar_dropdown_username').innerHTML = firebase.auth().currentUser.email.toString();
        document.getElementById('navbar_right_username').innerHTML = firebase.auth().currentUser.email.toString();
        document.getElementById('navbar_mobile_username').innerHTML = firebase.auth().currentUser.email.toString();
        page('/profile');
        
        // return;
        // this.userId = user.uid;
        // this.signedInUserAvatar.css('background-image',
            // `url("${user.photoURL || '/images/silhouette.jpg'}")`);
        // this.signedInUsername.text(user.displayName || 'Anonymous');
        // this.usernameLink.attr('href', `/user/${user.uid}`);
        // friendlyPix.firebase.saveUserData(user.photoURL, user.displayName);
      }
    });
  }
};

friendlyPix.auth = new friendlyPix.Auth();
friendlyPix.Auth.signedInState = 0;
