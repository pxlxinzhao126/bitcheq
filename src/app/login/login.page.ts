import { Component } from '@angular/core';
import { formatISO } from 'date-fns';
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

  constructor(private firebaseService: FirebaseService) {}

  switchState() {
    if (this.state === 'login') {
      this.state = 'signUp';
    } else if (this.state === 'signUp') {
      this.state = 'login';
    }
  }

  async login() {
    if (this.email && this.password) {
      try {
        const user = await this.firebaseService.signInWithEmailAndPassword(
          this.email,
          this.password,
        );
        console.log('login success', user);
      } catch (e) {
        console.error('login error', e);
      }
    }
  }

  async signUp() {
    if (this.email && this.password) {
      if (this.password === this.password) {
        try {
          const userCredential = await this.firebaseService.createUserWithEmailAndPassword(
            this.email,
            this.password,
          );
          console.log('signUp success', userCredential.user);
        } catch (e) {
          console.error('login error', e);
        }
      }
    }
  }
}
