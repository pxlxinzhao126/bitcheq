import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiEndpoint = 'http://localhost:3000';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUser() {
    // btcBalance: 0.00136
    // createdDate: "2021-03-07T23:26:45.568Z"
    // username: "pp1"
    return this.httpClient.get(`${apiEndpoint}/users?username=pp1`);
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
    return this.httpClient.get(`${apiEndpoint}/block/address?username=pp1`);
  }
}
