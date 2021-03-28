import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingController, PopoverController } from '@ionic/angular';
import * as moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { SendSevice } from '../serivce/send.service';
import { UserService } from '../serivce/user.service';
import { TransactionService } from '../transaction/transaction.service';
import { TestnetComponent } from './testnet/testnet.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  address: any;
  bitcheqUser: any;
  transactions: any[];
  destinationAddress = '';
  showAddress = false;
  showSend = false;
  copied = false;
  isLoading = true;
  subscription: Subscription;
  sendForm: FormGroup;
  sendFormSubmitted = false;
  loading;

  constructor(
    private userService: UserService,
    private sendSerivce: SendSevice,
    private router: Router,
    private transactionService: TransactionService,
    private clipboard: Clipboard,
    private iab: InAppBrowser,
    private popoverController: PopoverController,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private barcodeScanner: BarcodeScanner
  ) {}

  ngOnInit() {
    console.log('HomePage onInit');
    this.sendForm = this.formBuilder.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.min(0.00002),
          Validators.max(5),
          Validators.pattern('^[0-5]$|^[0-4].[0-9]{1,8}$'),
        ],
      ],
      address: ['', [Validators.required, Validators.minLength(30)]],
    });

    this.presentLoading();
    this.refresh(null);
  }

  ngOnDestroy() {
    console.log('HomePage onDestroy');
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Loading...',
    });
    await this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async refresh(event) {
    await this.userService.confirm();

    this.bitcheqUser = await this.userService.refreshCurrentUser();
    const addressRes = await this.userService.getAddress();
    /* tslint:disable:no-string-literal */
    this.address = addressRes['data']?.address;

    this.pollTransaction(event);
  }

  pollTransaction(event) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.bitcheqUser?.username) {
      this.subscription = interval(60000)
        .pipe(
          startWith(0),
          switchMap(() => this.userService.getTransactionByOwner()),
        )
        .subscribe((transactions: any[]) => {
          if (
            this.transactions &&
            this.transactions.length < transactions.length
          ) {
            this.updateBalance();
          }
          this.transactions = transactions;
          this.isLoading = false;
          event?.target?.complete();
          this.dismissLoading();
        });
    } else {
      this.isLoading = false;
      event?.target?.complete();
      console.warn('No user found. Did not refresh.');
      this.dismissLoading();
    }
  }

  async updateBalance() {
    this.bitcheqUser = await this.userService.refreshCurrentUser();
  }

  toggleAddress() {
    this.showSend = false;
    this.showAddress = !this.showAddress;
  }

  toggleSend() {
    this.showAddress = false;
    this.showSend = !this.showSend;
    this.sendFormSubmitted = false;
    this.sendForm.controls.address.setValue('');
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

  async presentTestnet(ev: any) {
    const popover = await this.popoverController.create({
      component: TestnetComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  async presentTooltip(ev: any) {
    const popover = await this.popoverController.create({
      component: TooltipComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  async submitSendForm() {
    this.sendFormSubmitted = true;

    if (this.sendForm.valid) {
      const amount = this.sendForm.controls.amount.value;
      const address = this.sendForm.controls.address.value;
      console.log(`sending ${amount} to ${address}`);
      this.sendSerivce.withdraw(+amount, address).subscribe(
        (res) => {
          console.log('send transaction finished');
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.sendForm.controls.address.setValue(barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
