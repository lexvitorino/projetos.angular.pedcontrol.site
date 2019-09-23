import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Login } from '../login.model';
import { MessageService } from 'src/app/shared/utils/messge.service';
import { BASE_URL_SITE, SITE_NAME } from 'src/app/config/config.constants';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public login = new Login();

  constructor(
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    document.body.className = 'hold-transition login-page';
  }

  onSubmit() {
    this.loginService.login(this.login).subscribe(resp => {
      if (this.loginService.logado()) {
        this.login = this.loginService.getLogin();
        this.messageService.success(SITE_NAME, `Olá ${this.login.nome}`);
        window.location.href = BASE_URL_SITE() + '/pages/dashboard';
      } else {
        this.messageService.warning('Login', resp.error);
      }
    });
  }

}
