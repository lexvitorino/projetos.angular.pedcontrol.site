import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, SITE_NAME } from '../config/config.constants';
import { Observable } from 'rxjs';
import { Login } from './login.model';
import { FuncoesService } from '../shared/utils/funcoes.service';
import { MessageService } from '../shared/utils/messge.service';
import * as moment from 'moment';
import * as jwt_decode from 'jwt-decode';
import { tap } from 'rxjs/operators';
import { DatetimeService } from '../shared/utils/datetime.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private funcoes: FuncoesService,
    private message: MessageService,
    private datetime: DatetimeService
  ) { }

  public logado(): boolean {
    const token = localStorage.getItem('token');
    return this.funcoes.stringService.isNotEmpty(token);
  }

  public login(login: Login): Observable<any> {
    return this.http.post<any>(`${BASE_URL()}/auth/login`, login)
      .pipe(
        tap(resp => {
          if (this.funcoes.stringService.isNotEmpty(resp.jwt)) {
            localStorage.setItem('token', resp.jwt);
          }
        })
      );
  }

  public logout() {
    this.message.info(SITE_NAME, `Volte logo ${this.getLogin().nome}`);
    localStorage.removeItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public isTokenExpired(): boolean {
    if (!this.logado()) {
      return true;
    }

    const exp = this.getLogin().exp;
    if (!exp) {
      return true;
    }

    const expDateTime = this.datetime.sqlToJsDate(exp);
    if (this.funcoes.isNotUndefinedOrNull(expDateTime)) {
      if (!this.datetime.checkDatas(new Date(), expDateTime)) {
        return true;
      }
    }

    return false;
  }

  public getLogin(): Login {
    if (this.funcoes.stringService.isNotEmpty(this.getToken())) {
      return jwt_decode(this.getToken());
    }
    return null;
  }
}
