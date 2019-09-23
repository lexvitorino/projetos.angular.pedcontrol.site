import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { MENUS } from './asidenavbar.constants';
import { Login } from 'src/app/login/login.model';
import { LoginService } from 'src/app/login/login.service';
import { StringService } from 'src/app/shared/utils/string.service';

@Component({
  selector: 'app-asidenavbar',
  templateUrl: './asidenavbar.component.html'
})
export class AsidenavbarComponent implements OnInit, AfterViewInit {

  public login: Login;
  public hasFilter = false;
  public filter: string;
  public menus_initial = MENUS;
  public menus_list: any[];

  constructor(
    private loginService: LoginService,
    private stringService: StringService
  ) {
  }

  ngOnInit() {
    this.login = this.loginService.getLogin();
  }

  ngAfterViewInit() {
    this.menus_list = [];
    if (this.menus_initial) {
      this.menus_initial.forEach(menu => {
        menu.menuFilho.forEach(filho => {
          this.menus_list.push(filho);
        });
      });
    }
  }

  filterChange() {
    this.hasFilter = this.stringService.isNotEmpty(this.filter);
  }

  public getMenus() {
    if (this.stringService.isNotEmpty(this.filter)) {
      const m = this.menus_list.filter(c => c.title.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) >= 0);
      return m;
    } else {
      return this.menus_list;
    }
  }

}
