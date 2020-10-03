import { LoginService } from './login/login.service';
import { Injectable } from "@angular/core";
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class loggedinInGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService){}

  checkAuthentication(path: string): boolean {
    const loggedIn = this.loginService.isLoggedIn();
    if(!loggedIn){
      this.loginService.handleLogin(`/${path}`);
    }
    return loggedIn;
  }

  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
    return this.checkAuthentication(activatedRoute.routeConfig.path);
  }

}