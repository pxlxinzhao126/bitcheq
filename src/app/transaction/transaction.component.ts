import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  private sub: Subscription;
  private id: string;

  constructor(
    private router: Router,
    private transactionService: TransactionService,
  ) {}

  ngOnInit() {
    console.log(this.transactionService.getSelectedTx());
  }

  back() {
    this.transactionService.setSelectedTx(null);
    this.router.navigate(['tabs', 'home']);
  }
}
