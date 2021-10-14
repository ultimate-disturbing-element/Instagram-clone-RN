import firebase from 'firebase'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCZiLDLHHiAumNA7LvAQQgJeqAM2Ac2JfY",
  authDomain: "rn-ig-cl.firebaseapp.com",
  projectId: "rn-ig-cl",
  storageBucket: "rn-ig-cl.appspot.com",
  messagingSenderId: "732241619603",
  appId: "1:732241619603:web:36c68156213430cb087b66"
};

// Initialize Firebase
!firebase.apps.length ? 
firebase.initializeApp(firebaseConfig) 
: firebase.app()

const db = firebase.firestore()

export {firebase,db}