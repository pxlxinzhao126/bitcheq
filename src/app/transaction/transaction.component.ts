import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as moment from 'moment';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, OnDestroy {
  tx: any;

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private iab: InAppBrowser,
  ) {}

  ngOnInit() {
    this.tx = this.transactionService.getSelectedTx();
    if (!this.tx) {
      this.router.navigate(['']);
    }
    console.log('TxPage onInit');
  }

  ngOnDestroy() {
    console.log('TxPage onDestroy');
  }

  shortId() {
    if (this.tx) {
      const txid = this.tx?.txid as string;
      const len = txid.length;
      return `${txid.substring(0, 8)}...${txid.substring(len - 8, len)}`;
    }
  }

  fullDate() {
    return moment(this.tx?.createdDate).format('MM/DD/YYYY h:mm:ss a Z');
  }

  back() {
    this.transactionService.setSelectedTx(null);
    this.router.navigate(['tabs', 'home']);
  }

  viewTx(event) {
    event.preventDefault();
    this.iab.create(
      `https://sochain.com/tx/BTCTEST/${this.tx?.txid}`,
    );
  }
}
