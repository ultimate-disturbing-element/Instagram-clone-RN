
import {firebase} from './firebase'
import { SignedInStack, SignedOutStack } from "./Navigation";
import React,{ useState,useEffect } from "react";


const AuthNavigation = () => {
    const [currentUser,setCurrentUser] = useState(null)

    const userHandler = user => user ? setCurrentUser(user) : setCurrentUser(null)
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => userHandler(user)),
   []
   )

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
