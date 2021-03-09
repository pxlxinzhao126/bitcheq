import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../serivce/firebase.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit{
  email: string;
  password: string;
  // firebase: any;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    /* tslint:disable:no-string-literal */
    // this.firebase = window['firebase'];
  }

  async login() {
    if (this.email && this.password) {
      try {
        const user = await this.firebaseService.signInWithEmailAndPassword(this.email, this.password);
        console.log('login success', user);
      } catch (e) {
        console.error('login error', e);
      }
    }
  }

  test() {
    const res = this.firebaseService.getCurrentUser();
  }
}
