import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public firebaseService: FirebaseService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.firebaseService.getCurrentUser();
    if (user) {
      // tslint:disable-next-line:no-string-literal
      request = request.clone({
        setHeaders: {
          // tslint:disable-next-line:no-string-literal
          Authorization: `Bearer ${user['za']}`
        }
      });
    }
    return next.handle(request);
  }
}
