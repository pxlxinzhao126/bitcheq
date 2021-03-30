import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../serivce/firebase.service';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { UserService } from '../serivce/user.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  email = 'apple3@me.com';
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
    'auth/too-many-requests',
  ];
  gmailUsed = false;

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log('LoginPage onInit');
    this.clearError();
  }

  ngOnDestroy() {
    console.log('LoginPage onDestroy');
  }

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
    if (
      this.email &&
      this.isValidEmail() &&
      this.password &&
      this.password.length >= this.minLength
    ) {
      try {
        const user = await this.firebaseService.signInWithEmailAndPassword(
          this.email,
          this.password,
        );
        console.log('firebase login success', user);
        this.router.navigate(['tabs', 'home']);
      } catch (e) {
        console.error('login error', e);
        this.errorCode = e.code;
      }
    }
  }

  async signUp() {
    this.submitted = true;
    if (
      this.email &&
      this.isValidEmail() &&
      this.password &&
      this.password.length >= this.minLength &&
      this.password === this.password2
    ) {
      try {
        const userCredential = await this.firebaseService.createUserWithEmailAndPassword(
          this.email,
          this.password,
        );
        console.log('signUp success', userCredential.user);
        this.signUpSuccess = true;
        this.switchState();

        await this.userService.createUserIfNotExists(this.email);
        setTimeout(() => {
          this.signUpSuccess = false;
        }, 5000);
      } catch (e) {
        console.error('login error', e);
        this.errorCode = e.code;
      }
    }
  }

  async googleSignIn() {
    try {
      const googleUser = (await Plugins.GoogleAuth.signIn()) as any;

      this.firebaseService.signInWithCredential(googleUser).then((res) => {
        console.log(res);
        this.router.navigate(['tabs', 'home']);
      }).catch((err) => {
        console.log(err);
      })

    } catch (error) {
      console.log('googleSignIn error', error);

      if (error.code === 'auth/wrong-password') {
        console.log(
          `Gmail user is already registered, please use email and password to login.`,
        );
        this.gmailUsed = true;
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
    this.gmailUsed = false;
  }

  isUnknownError() {
    return this.errorTypes.indexOf(this.errorCode) === -1;
  }
}
