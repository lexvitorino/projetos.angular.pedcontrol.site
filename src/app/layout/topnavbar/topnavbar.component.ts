import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/login/login.model';

import * as moment from 'moment';
import { SITE_TITLE_POSFIX, SITE_TITLE_PREFIX, SITE_TITLE_MIN_PREFIX, SITE_TITLE_MIN_POSFIX } from 'src/app/config/config.constants';
import { StringService } from '../../shared/utils/string.service';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html'
})
export class TopnavbarComponent implements OnInit {

  public login: Login;
  public siteTitleMinPrefix = SITE_TITLE_MIN_PREFIX;
  public siteTitleMinPosfix = SITE_TITLE_MIN_POSFIX;
  public siteTitlePrefix = SITE_TITLE_PREFIX;
  public siteTitlePosfix = SITE_TITLE_POSFIX;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.login = this.loginService.getLogin();
    this.login.expFmt = moment(this.login.exp).format('DD/MM/YYYY HH:mm:ss');
  }

  public logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
