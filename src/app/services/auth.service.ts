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

  auth = getAuth();
  app = initializeApp(environment.firebase);
  isAdmin: boolean = false;

  constructor() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(getFirestore(this.app), "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.isAdmin = docSnap.data()['role'] == 1 ? true : false;
        } else {
          // in this case, doc.data() will be undefined 
          this.isAdmin = false;
        }
      } else {
        this.isAdmin = false;
      }
      console.log(this.auth.currentUser + " coucou");
    })
  }

  

  isAuth(): boolean{
    return this.auth.currentUser ? true: false;
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
        firstName: 'Admin',
        lastName: 'Valjean',
        role: 1
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
