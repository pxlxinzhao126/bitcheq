import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { UserService } from '../serivce/user.service';
import { TransactionService } from '../transaction/transaction.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';

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
  copied = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private transactionService: TransactionService,
    private clipboard: Clipboard
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      console.log('user', user);
      this.pollTransaction();
    });

    this.userService.getAddress().subscribe((res) => {
      /* tslint:disable:no-string-literal */
      this.address = res['data'].address;
    });
  }

  pollTransaction() {
    if (this.user?.username) {
      interval(500000)
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
    if (this.user) {
      return Math.round(this.user.btcBalance * 100000000) / 100000000;
    } else {
      return 0;
    }
  }

  getTransactionTime(tx) {
    return moment(tx.createdDate).fromNow();
  }

  async presentTransaction(tx) {
    this.transactionService.setSelectedTx(tx);
    this.router.navigate(['tx']);
  }

  copy() {
    if ( this.address ) {
      this.clipboard.copy(this.address);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
  }
}
