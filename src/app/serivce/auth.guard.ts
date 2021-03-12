import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private firebaseService: FirebaseService, public router: Router) {}
  canActivate(): boolean {
    if (!this.firebaseService.getCurrentUser()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
