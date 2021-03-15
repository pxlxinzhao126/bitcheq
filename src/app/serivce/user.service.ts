import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const user = 'pear';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getTransactionByOwner(owner: string) {
    return this.httpClient.get(
      `${environment.apiEndpoint}/transactions/owner/${owner}`,
    );
  }

  getUser() {
    return this.httpClient.get(
      `${environment.apiEndpoint}/users?username=${user}`,
    ).toPromise();
  }

  getAddress() {
    return this.httpClient.get(
      `${environment.apiEndpoint}/block/address?username=${user}`,
    ).toPromise();
  }

  confirm() {
    return this.httpClient.post(
      `${environment.apiEndpoint}/block/confirm`, { user },
    ).toPromise();
  }
}
