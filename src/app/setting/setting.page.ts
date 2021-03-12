import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../serivce/firebase.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss'],
})
export class SettingPage implements OnInit {
  user: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.firebaseService.getCurrentUser();
    console.log('this.user', this.user);
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
