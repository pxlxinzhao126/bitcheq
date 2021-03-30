import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class SendService {
  private transactionSubject = new Subject<any>();

  constructor(private httpClient: HttpClient) {}

  broadcast(msg) {
    this.transactionSubject.next({ text: msg });
  }

  getTransactionSubject() {
    return this.transactionSubject.asObservable();
  }

  withdraw(amount: number, toAddress: string) {
    return this.httpClient.post(`${environment.apiEndpoint}/block/withdraw`, {
      amount,
      toAddress,
    });
  }

  estimate(amount: number, toAddress: string) {
    return this.httpClient.post(`${environment.apiEndpoint}/block/estimate`, {
      amount,
      toAddress,
    });
  }
}
