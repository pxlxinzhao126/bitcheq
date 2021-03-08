import { Component, OnInit } from '@angular/core';
import { UserService } from '../serivce/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  address: any;
  user: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      console.log('user', user);
      this.user = user;
    });
    this.userService.getAddress().subscribe((address) => {
      this.address = address;
    });
  }

}
