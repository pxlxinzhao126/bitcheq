import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FirebaseService } from '../serivce/firebase.service';
import { UserService } from '../serivce/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss'],
})
export class SettingPage implements OnInit, OnDestroy {
  user: any;
  bitcheqUser: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    console.log('SettingPage onInit');

    this.user = this.firebaseService.getCurrentUser();

    if (this.user.email) {
      this.userService
        .getUser(encodeURIComponent(this.user.email))
        .then((res) => {
          this.bitcheqUser = res;
          console.log('res', res);
        });
    }
  }

  ngOnDestroy() {
    console.log('SettingPage onDestroy');
  }

  getStartedDate() {
    if (this.bitcheqUser) {
      return moment(this.bitcheqUser.createdDate).format('MMM DD YYYY');
    }
  }

  async logout() {
    await this.firebaseService.signOut();
    this.router.navigate(['login']);
  }
}
