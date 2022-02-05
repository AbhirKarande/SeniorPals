import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
//import firebase from 'firebase/app'
import React, {useEffect, useState} from 'react';
//import { initializeApp } from "firebase/app";


// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRZwG5wnx0pUy_iNJvqgQ71anRF51QWEU",
  authDomain: "seniorpals-5178e.firebaseapp.com",
  projectId: "seniorpals-5178e",
  storageBucket: "seniorpals-5178e.appspot.com",
  messagingSenderId: "662444034437",
  appId: "1:662444034437:web:dc7dc5a1ff86e7a5695cec",
  measurementId: "G-3KGRDMPRM8"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  
  useEffect(() => {
    initializeFirebase();
    listenForAuthenticationChange();
})

const initializeFirebase = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

const listenForAuthenticationChange = () => {
    // Listen for firebase authentication state to change
    firebase.auth().onAuthStateChanged((localFirebaseUser) => {
        if (localFirebaseUser != null) {
            console.log("FIREBASE: Authenticated");
            setAuthenticated(true);
            setUser(localFirebaseUser)
        } else {
            console.log("FIREBASE: Logged out");
            setAuthenticated(false);
            setUser(null);
        }
    })
}
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
