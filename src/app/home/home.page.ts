import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { UserService } from '../serivce/user.service';
import { TransactionService } from '../transaction/transaction.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PopoverController } from '@ionic/angular';
import { TooltipComponent } from './tooltip/tooltip.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  address: any;
  bitcheqUser: any;
  transactions: any[];
  showAddress = false;
  copied = false;
  isLoading = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private transactionService: TransactionService,
    private clipboard: Clipboard,
    private iab: InAppBrowser,
    private popoverController: PopoverController,
  ) {}

  ngOnInit() {
    this.refresh(null);
  }

  async refresh(event) {
    await this.userService.confirm();

    this.bitcheqUser = await this.userService.getUser(null);
    const addressRes = await this.userService.getAddress();
    /* tslint:disable:no-string-literal */
    this.address = addressRes['data']?.address;

    this.pollTransaction(event);
  }

  pollTransaction(event) {
    if (this.bitcheqUser?.username) {
      interval(500000)
        .pipe(
          startWith(0),
          switchMap(() => this.userService.getTransactionByOwner()),
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
          this.isLoading = false;
          event?.target?.complete();
        });
    }
  }

  async updateBalance() {
    this.bitcheqUser = await this.userService.getUser(null);
  }

  toggleAddress() {
    this.showAddress = !this.showAddress;
  }

  getBalance() {
    if (this.bitcheqUser) {
      return Math.round(this.bitcheqUser.btcBalance * 100000000) / 100000000;
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
    if (this.address) {
      this.clipboard.copy(this.address);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
  }

  requestBitcoin() {
    const browser = this.iab.create('https://coinfaucet.eu/en/btc-testnet');
    // browser.on('loadstop')?.subscribe((event) => {
    //   browser.executeScript({
    //     code: `document.getElementById('address').value=${this.address}`,
    //   });
    // });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TooltipComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
