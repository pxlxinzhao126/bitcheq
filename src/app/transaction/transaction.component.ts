import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionService } from './transaction.service';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  private sub: Subscription;
  private id: string;
  tx: any;

  constructor(
    private router: Router,
    private transactionService: TransactionService,
  ) {}

  ngOnInit() {
    this.tx = this.transactionService.getSelectedTx();
    if (!this.tx) {
      this.router.navigate(['']);
    }
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
}
