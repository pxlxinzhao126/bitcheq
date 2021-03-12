import { Component } from '@angular/core';
import { FirebaseService } from '../serivce/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email = 'p@p.com';
  password = '123456';
  password2: string;
  state = 'login';
  submitted = false;
  errorCode = null;
  errorTypes = [
    'auth/email-already-in-use',
    'auth/wrong-password',
    'auth/user-not-found',
    'auth/too-many-requests'
  ];

  constructor(private firebaseService: FirebaseService) {}

  switchState() {
    if (this.state === 'login') {
      this.state = 'signUp';
    } else if (this.state === 'signUp') {
      this.state = 'login';
    }
    this.submitted = false;
    this.errorCode = null;
  }

  async login() {
    this.submitted = true;
    if (this.email && this.password) {
      try {
        const user = await this.firebaseService.signInWithEmailAndPassword(
          this.email,
          this.password,
        );
        console.log('login success', user);
      } catch (e) {
        console.error('login error', e);
        this.errorCode = e.code;
      }
    }
  }

  async signUp() {
    this.submitted = true;
    if (this.email && this.password && this.password === this.password2) {
      try {
        const userCredential = await this.firebaseService.createUserWithEmailAndPassword(
          this.email,
          this.password,
        );
        console.log('signUp success', userCredential.user);
      } catch (e) {
        console.error('login error', e);
        this.errorCode = e.code;
      }
    }
  }

  isValidEmail() {
    return (
      this.email?.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g)?.length > 0
    );
  }

  clearErrorCode() {
    this.errorCode = null;
  }

  isUnknownError() {
    return this.errorTypes.indexOf(this.errorCode) === -1;
  }
}
