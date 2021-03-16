import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../serivce/firebase.service';
import { Plugins } from '@capacitor/core';
import { UserService } from '../serivce/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss'],
})
export class SettingPage implements OnInit {
  user: any;
  bitcheqUser: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.firebaseService.getCurrentUser();

    if (this.user.email) {
      this.userService.getUser(encodeURIComponent(this.user.email)).then((res) => {
        this.bitcheqUser = res;
        console.log('res', res);
      });
    }
  }

  getStartedDate() {
    if (this.bitcheqUser) {
      return moment(this.bitcheqUser.createdDate).format('MMM DD YYYY');
    }
  }

  async logout() {
    if (this.firebaseService.isGoogle) {
      await Plugins.GoogleAuth.signOut();
    } else {
      await this.firebaseService.signOut();
    }
    this.router.navigate(['login']);
  }
}
