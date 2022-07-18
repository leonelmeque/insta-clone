import React from 'react'
import firebase from 'firebase';

export function useAuth(){
   
    const onSignIn = (email: string, password: string) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                return result
            })
            .catch((result) => {
    
            });
    };

    const onSignUp = (email: string, password: string, username: string) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(firebase.auth()?.currentUser?.uid)
                    .set({
                        username,
                        email,
                    });
            })
            .catch((result) => {
                console.log(result);
            });
    };

     const onLogOut = () => {
        return firebase.auth().signOut().then((result) => { }).catch((err) => { })
    }
    
  return {
    onSignIn,
    onLogOut,
    onSignUp
  }
}