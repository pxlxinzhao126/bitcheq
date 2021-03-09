import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBjCwaZ7w9FuBmR56uuF6o6V_pNSluiHoU',
  authDomain: 'bitcheq.firebaseapp.com',
  databaseURL: 'https://bitcheq-default-rtdb.firebaseio.com',
  projectId: 'bitcheq',
  storageBucket: 'bitcheq.appspot.com',
  messagingSenderId: '1084343878879',
  appId: '1:1084343878879:web:d16d614e928009801cd56a',
  measurementId: 'G-SKZSQZ0WL0'
};

firebase.initializeApp(firebaseConfig);

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  async signOut() {
    return firebase.auth().signOut();
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}
