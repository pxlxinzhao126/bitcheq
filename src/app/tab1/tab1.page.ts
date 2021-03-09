import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit{
  email: string;
  password: string;
  // firebase: any;

  constructor() {}

  ngOnInit() {
    /* tslint:disable:no-string-literal */
    // this.firebase = window['firebase'];
  }

  login() {
    firebase.auth().signInWithEmailAndPassword('p@p.com', '123456')
    .then((userCredential) => {
      console.log('userCredential', userCredential);
    })
    .catch((error) => {
    });
  }
}
