import { LoginService } from './../security/login/login.service';
import { Component, OnInit } from '@angular/core';
import { HeaderStyleService } from '../header-style.service';
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUrl: string;

  constructor( private loginService: LoginService,public headerStyleService: HeaderStyleService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        if (e.url !== '/') {
          this.headerStyleService.headerLightStyle = true;
        }
      });
  }

  setHeaderStyleFalse() {
    this.headerStyleService.headerLightStyle = false;
  }

  setHeaderStyleTrue() {
    this.headerStyleService.headerLightStyle = true;
  }

  login() {
    this.loginService.handleLogin();
  }

  logout() {
    this.loginService.logout();
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }


}
