import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { UserService } from '../serivce/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  address: any;
  user: any;
  transactions: any[];
  showAddress = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.pollTransaction();
    });

    this.userService.getAddress().subscribe((address) => {
      this.address = address;
    });
  }

  pollTransaction() {
    if (this.user?.username) {
      interval(5000)
        .pipe(
          startWith(0),
          switchMap(() =>
            this.userService.getTransactionByOwner(this.user.username),
          ),
        )
        .subscribe((res: any[]) => {
          console.log('res', res);
          if (this.transactions && this.transactions.length < res.length) {
            this.updateBalance();
          }
          this.transactions = res;
        });
    }
  }

  updateBalance() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  toggleAddress() {
    this.showAddress = !this.showAddress;
  }
}
