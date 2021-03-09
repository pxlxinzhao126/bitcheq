import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit{
  email: string;
  password: string;

  constructor() {}

  ngOnInit() {
  }

  login() {
    console.log('email', this.email);
    console.log('password', this.password);
  }
}
