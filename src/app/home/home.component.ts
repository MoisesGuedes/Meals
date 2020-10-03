import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderStyleService } from '../header-style.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor( public headerStyleService:HeaderStyleService ) { }

  ngOnInit(): void {
  }

  changeHeaderStyle(){
    this.headerStyleService.changeHeaderStyle();
  }
}
