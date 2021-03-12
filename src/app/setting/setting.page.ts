import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../serivce/firebase.service';

@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss'],
})
export class SettingPage implements OnInit {
  user: any;

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.user = this.firebaseService.getCurrentUser();
    console.log('this.user', this.user);
  }
}
