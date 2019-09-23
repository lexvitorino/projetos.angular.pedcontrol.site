import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from "@angular/router";
import { Route } from "@angular/compiler/src/core";
import { Observable } from "rxjs";
import { LoginService } from './login/login.service';

@Injectable()
export class AppGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) {
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.verificarAcesso();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.verificarAcesso();
    }

    private verificarAcesso() {
        if (this.loginService.isTokenExpired()) {
            this.router.navigate(['login']);
        } else {
            return true;
        }
        return false;
    }
}
