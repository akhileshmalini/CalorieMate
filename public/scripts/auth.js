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
    $(document).ready(() => {
      this.signedOutOnlyElements = $('.fp-signed-out-only');
      this.signedInOnlyElements = $('.fp-signed-in-only');

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
      location.reload();
      alert('Password Reset link has been sent to the email address');
    }).catch(function(error) {
      $('#pass_reset_error').css('display', '');
      document.getElementById('pass_reset_error').innerHTML = error.errorMessage;
    });
  }

  signUpHandler(){
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
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function(){
      
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      $('#signup_error').css('display', '');
      if (errorCode == 'auth/weak-password') {
        document.getElementById('signup_error').innerHTML = 'The password is too weak.';
      } else {
        document.getElementById('signup_error').innerHTML = errorMessage;
      }
      return;
    });
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
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
      $('#signin_error').css('display', '');
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
      document.getElementById('signin_error').innerHTML = 'Wrong Password';
      }else {
      document.getElementById('signin_error').innerHTML = errorMessage;
      }
    });
    
    
    // page('home');
  }

  loadProfile() {
    
  }
  
  onAuthStateChanged(user) {
    if (window.friendlyPix.router) {
      window.friendlyPix.router.reloadPage();
    }
    this._waitForAuthPromiseResolver.resolve();
    $(document).ready(() => {
      if (!user) {
        this.signedOutOnlyElements.show();
        this.signedInOnlyElements.hide();
        friendlyPix.state = 0;
        page('/');
      } else {
        console.log(friendlyPix.state);
        this.signedOutOnlyElements.hide();
        this.signedInOnlyElements.show();
        document.getElementById('navbar_username').innerHTML = firebase.auth().currentUser.email.toString();
        document.getElementById('navbar_dropdown_username').innerHTML = firebase.auth().currentUser.email.toString();
        document.getElementById('navbar_right_username').innerHTML = firebase.auth().currentUser.email.toString();
        document.getElementById('navbar_mobile_username').innerHTML = firebase.auth().currentUser.email.toString();
        if (window.location.pathname == '/'){
            page('/browse');
            window.location.reload();
        }
        else
          page(window.location.pathname);
      }
    });
  }
};

friendlyPix.auth = new friendlyPix.Auth();