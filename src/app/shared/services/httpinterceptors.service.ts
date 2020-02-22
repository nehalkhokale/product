import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  token: any;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = JSON.parse(sessionStorage.getItem('Token'));
    request = request.clone({
      setHeaders: {
        Authorization: `${this.token}`
      }

    });
    return next.handle(request);
  }
}
