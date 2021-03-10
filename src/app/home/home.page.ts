import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { UserService } from '../serivce/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
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
        .subscribe((transactions: any[]) => {
          console.log('transactions', transactions);
          if (
            this.transactions &&
            this.transactions.length < transactions.length
          ) {
            this.updateBalance();
          }
          this.transactions = transactions;
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

  getBalance() {
    return Math.round(this.user.btcBalance * 100000000) / 100000000;
  }
}
