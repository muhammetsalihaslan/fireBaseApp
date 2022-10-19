import { initializeApp } from "firebase/app";
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,  
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile } from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helpers/ToastNotify";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAqc-dt1rFrs8wdPSy8EGBesUvFaLSHiZo",
  authDomain: "fir-a3c27.firebaseapp.com",
  projectId: "fir-a3c27",
  storageBucket: "fir-a3c27.appspot.com",
  messagingSenderId: "621260892097",
  appId: "1:621260892097:web:7725b4c33ffab2921eb140"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (email, password, navigate, displayName) => {
 try {
   let userCredential = await createUserWithEmailAndPassword(auth, email, 
   password);
   await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
   toastSuccessNotify('Registered successfully!')
   navigate("/login")
   console.log(userCredential);
    
 } catch (error) {
    toastErrorNotify(error.message);
 }
      
};

export const signIn = async (email, password, navigate) => {
    try {
      let userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
      toastSuccessNotify('Logged in successfully!')
      console.log(userCredential);
 
    } catch (error) {
        toastErrorNotify(error.message)
        console.log(error);
    }
};


export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(false);
    }
  });
};






export const logOut = () => {
  signOut(auth);
};


export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
    navigate('/')

  })
  .catch((error) => {
    console.log(error);
  });
};

export const forgotPassword = (email) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // alert('please check your mail box!')
    toastWarnNotify('Please check your mail box!')
  })
  .catch((error) => {
    // alert('error')
    toastErrorNotify(error.message)
  });
};