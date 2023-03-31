import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Rooms } from '../room.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  app = initializeApp(environment.firebase);
  auth = getAuth();

  isAuth(): boolean{
    return this.auth.currentUser ? true: false;
  }

  async isOwner(): Promise<boolean>{
    if (this.auth.currentUser) {
      const docRef = doc(getFirestore(this.app), "users", this.auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data()['role'] == 1 ? true : false;
      } else {
        // in this case, doc.data() will be undefined 
        return false;
      }
    }
    console.log(this.auth.currentUser);
    return false;
  }

  // Inscription with e-mail / password
  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // Create the user in the database
      const db = getFirestore(this.app);
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, {
        firstName: 'Jean',
        lastName: 'Valjean',
        role: 0
      })
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  // Connexion with email / password
  signIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      console.log('Succesfully sign in !');
      const user = userCredential.user;
    }).catch((error) => {
      console.log('Something is wrong:', error.message);
    })
  }

  disconnect() {
    signOut(this.auth).then(() => {
      // Sign out succesful
    }).catch((error) => {
      // An error happened
    })
  }

  isAuthOwner(room: Rooms): boolean {
    if (this.auth.currentUser) {
      if (this.auth.currentUser.uid === room.owner) {
        return true;
      }
    }
    return false;
  }
}
