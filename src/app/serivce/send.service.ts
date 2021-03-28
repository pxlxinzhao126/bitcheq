import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class SendSevice {
  constructor(
    private httpClient: HttpClient,
    private firebaseService: FirebaseService,
  ) {}

  private getCurrentUserEmail() {
    return this.firebaseService.getCurrentUser().email;
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
