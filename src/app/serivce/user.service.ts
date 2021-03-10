import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const user = 'KamiSan';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getTransactionByOwner(owner: string) {
    // Array of transactions
    // "_id": "6045615650e90c36aa2f87c2",
    // "network": "BTCTEST",
    // "address": "2N6hMCvhsz1Jp2i3KbSEnuYPZauNbm7PgNa",
    // "balance_change": 0.00136,
    // "amount_sent": 0,
    // "amount_received": 0.00136,
    // "txid": "823a39157114bdc058e07c13761208a83a6839e6cbb92839c54dd99968278333",
    // "confirmations": 1,
    // "is_green": false,
    // "status": "Completed",
    // "__v": 0
    return this.httpClient.get(
      `${environment.apiEndpoint}/transactions/owner/${owner}`,
    );
  }

  getUser() {
    // btcBalance: 0.00136
    // createdDate: "2021-03-07T23:26:45.568Z"
    // username: "pp1"
    return this.httpClient.get(
      `${environment.apiEndpoint}/users?username=${user}`,
    );
  }

  getAddress() {
    // address: "2N6hMCvhsz1Jp2i3KbSEnuYPZauNbm7PgNa"
    // label: "pp1-1615159612622"
    // network: "BTCTEST"
    // owner: "pp1"
    // used: false
    // user_id: 26
    // __v: 0
    // _id: "6045613d50e90c36aa2f87c1"
    return this.httpClient.get(
      `${environment.apiEndpoint}/block/address?username=${user}`,
    );
  }
}
