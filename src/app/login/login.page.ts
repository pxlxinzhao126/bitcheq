import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  minLength = 6;
  state = 'login';
  submitted = false;
  signUpSuccess = false;
  errorCode = null;
  errorTypes = [
    'auth/email-already-in-use',
    'auth/wrong-password',
    'auth/user-not-found',
    'auth/too-many-requests'
  ];

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  switchState() {
    if (this.state === 'login') {
      this.state = 'signUp';
    } else if (this.state === 'signUp') {
      this.state = 'login';
    }
    this.clearError();
  }

  async login() {
    this.submitted = true;
    if (this.email && this.isValidEmail() && this.password && this.password.length >= this.minLength) {
      try {
        const user = await this.firebaseService.signInWithEmailAndPassword(
          this.email,
          this.password,
        );
        console.log('login success', user);
        this.router.navigate(['']);
      } catch (e) {
        console.error('login error', e);
        this.errorCode = e.code;
      }
    }
  }

  async signUp() {
    this.submitted = true;
    if (this.email && this.isValidEmail() && this.password && this.password.length >= this.minLength && this.password === this.password2) {
      try {
        const userCredential = await this.firebaseService.createUserWithEmailAndPassword(
          this.email,
          this.password,
        );
        console.log('signUp success', userCredential.user);
        this.signUpSuccess = true;
        this.switchState();
        setTimeout(() => {
          this.signUpSuccess = false;
        }, 5000);
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

  clearError() {
    this.submitted = false;
    this.errorCode = null;
  }

  isUnknownError() {
    return this.errorTypes.indexOf(this.errorCode) === -1;
  }
}
