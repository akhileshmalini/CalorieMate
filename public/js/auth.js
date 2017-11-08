  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDxeZyimDYN5KNmwrVlVrn2sLrmKfgH400",
    authDomain: "caloriemeter-79b5f.firebaseapp.com",
    databaseURL: "https://caloriemeter-79b5f.firebaseio.com",
    projectId: "caloriemeter-79b5f",
    storageBucket: "caloriemeter-79b5f.appspot.com",
    messagingSenderId: "159068963801"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


function togglesignOut(){
    firebase.auth().signOut();
    alert("User has Signed Out.");
    window.location="/"; 
}
//SignIn Function
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    var email = document.getElementById('login_user_name').value;
    var password = document.getElementById('login_password').value;
    
    //Rudimentary Validation
    if (email.length < 4) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a valid password.');
      return;
    }
    
    
    // Sign in with email and pass.
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert(errorMessage);
        
      } else {
        alert(errorMessage);
      }
      console.log(error);
    
    });
  }


}


//Sign Up Function
function handleSignUp() {
  var email = document.getElementById('emails').value;
  var password = document.getElementById('password').value;
  var repassword = document.getElementById('repassword').value;
  var fname = document.getElementById('fname').value;
  var lname = document.getElementById('lname').value;
  var dob = document.getElementById('dob').value;
  
  var name =fname+" "+lname;
  


  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }

    if(password!=repassword){
        alert('Passwords Dont Match');
        return;
    }
  // Sign in with email and pass.
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){


    

    firebase.database().ref('users/' + user.uid).set({
        username: name,
        email: email,
        daob : dob
      });

    console.log('uid',user.uid);

    

  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
  


}






function sendPasswordReset() {
  var email = document.getElementById('email').value;
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    alert('Password Reset Email Sent! Please Check Your Email to Reset Password');
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });
}
