import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private firebaseService: FirebaseService,
  ) {}

  private getCurrentUserEmail() {
    return this.firebaseService.getCurrentUser().email;
  }

  getTransactionByOwner() {
    return this.httpClient.get(`${environment.apiEndpoint}/transactions`);
  }

  createUser(email: string) {
    return this.httpClient
      .post(`${environment.apiEndpoint}/users/create`, {})
      .toPromise();
  }

  getUser(email) {
    return this.httpClient.get(`${environment.apiEndpoint}/users`).toPromise();
  }

  refreshCurrentUser() {
    return this.httpClient.get(`${environment.apiEndpoint}/users`).toPromise();
  }

  verifyEmail() {
    return this.httpClient
      .get(`${environment.apiEndpoint}/users/verifyEmail`)
      .toPromise();
  }

  getAddress() {
    return this.httpClient
      .get(`${environment.apiEndpoint}/block/address`)
      .toPromise();
  }

  confirm() {
    return this.httpClient
      .post(`${environment.apiEndpoint}/block/confirm`, {
        user: this.getCurrentUserEmail(),
      })
      .toPromise();
  }

  async createUserIfNotExists(email: string) {
    const bitcheqUser = await this.getUser(email);

    if (!bitcheqUser) {
      await this.createUserByEmail(email);
    } else {
      // tslint:disable-next-line:no-string-literal
      console.log(`user ${bitcheqUser['username']} exists`);
    }
  }

  async createUserAndSignUpFirebaseIfNotExists(googleUser: any) {
    const { email, id } = googleUser;
    const bitcheqUser = await this.verifyEmail();

    if (!bitcheqUser) {
      await this.firebaseService
        .createUserWithEmailAndPassword(email, id)
        .then((result) => console.log(`created firebase user ${email}`))
        .catch((e) => {
          console.log(`Not able to create firebase user ${email}`);
        });
      await this.createUserByEmail(email);
      console.log(`created bitcheq user ${email}`);
    } else {
      // tslint:disable-next-line:no-string-literal
      console.log(`user ${bitcheqUser['username']} exists`);
    }
  }

  private async createUserByEmail(email: string) {
    try {
      const newUser = await this.createUser(email);
      console.log(`newUser created ${JSON.stringify(newUser)}`);
    } catch (e) {
      console.log(`fail to create user ${JSON.stringify(e)}`);
    }
  }
}
