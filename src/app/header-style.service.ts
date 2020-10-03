import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderStyleService {

  constructor() { }
  headerLightStyle: boolean = false;

  changeHeaderStyle() {
    this.headerLightStyle = !this.headerLightStyle;
  }
}
