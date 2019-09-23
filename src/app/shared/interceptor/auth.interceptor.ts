import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    public injector: Injector,
    public router: Router,
    public loginService: LoginService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<| HttpProgressEvent | HttpResponse<any> | HttpEvent<any>> {

    const loginService = this.injector.get(LoginService);
    if (loginService.logado() && req.url.indexOf('login') < 0) {
      /*
      QUANDI IMPLEMENTAR MODAL COM LOGIN
      if (loginService.isTokenExpired()) {
          jQuery('#re-login-dialog').modal('show');
          return EMPTY;
      }
      */

      let request = req;
      if (req.url.indexOf('wspedcontrol') >= 0) {
        request = req.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      }

      return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
          this.loginService.logout();
          this.router.navigate(['login']);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      }));
    } else {
      return next.handle(req);
    }
  }
}
