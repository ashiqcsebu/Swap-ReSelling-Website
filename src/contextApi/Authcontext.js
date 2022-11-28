import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import app from "../firebase/firebase.config";
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export const myContext = createContext();
const Authcontext = ({ children }) => {
  const [products, setproducts] = useState(false)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const signuP = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleSignin = () =>{
    setLoading(true)
    return signInWithPopup(auth, provider)
  }

  useEffect(() => {
    const unsbucribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
    });

    return () => unsbucribe();
  }, []);

  const contextValue = {
    signuP,
    logIn,
    updateUser,
    logOut,
    user,
    loading,
    googleSignin,
    setproducts,
    products

  };

  return (
    <myContext.Provider value={contextValue}>{children}</myContext.Provider>
  );
};

export default Authcontext;
