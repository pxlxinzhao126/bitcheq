import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import { Injectable } from '@angular/core';

const firebaseConfig = {
  apiKey: 'AIzaSyBjCwaZ7w9FuBmR56uuF6o6V_pNSluiHoU',
  authDomain: 'bitcheq.firebaseapp.com',
  databaseURL: 'https://bitcheq-default-rtdb.firebaseio.com',
  projectId: 'bitcheq',
  storageBucket: 'bitcheq.appspot.com',
  messagingSenderId: '1084343878879',
  appId: '1:1084343878879:web:d16d614e928009801cd56a',
  measurementId: 'G-SKZSQZ0WL0',
};

firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private googleUser = null;

  isGoogle() {
    return !!this.googleUser;
  }

  getCurrentUser() {
    if (this.isGoogle()) {
      return this.googleUser;
    }
    return firebase.auth().currentUser;
  }

  setGoogleUser(user) {
    this.googleUser = user;
  }

  async signOut() {
    return firebase.auth().signOut();
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  async googleSignIn() {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}
