import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { UserService } from '../serivce/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  address: any;
  user: any;
  transaction: any;
  showAddress = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      console.log('user', user);
      this.user = user;
    });

    this.userService.getAddress().subscribe((address) => {
      this.address = address;
      this.pollTransaction();
    });
  }

  pollTransaction() {
    if (this.address?.address) {
      interval(5000)
        .pipe(
          startWith(0),
          switchMap(() => this.userService.getTransactionByAddress(this.address.address))
          )
        .subscribe((res) => {
          this.transaction = res;
        });
    }
  }

  toggleAddress() {
    this.showAddress = !this.showAddress;
  }

}
