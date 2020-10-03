import { MenuItem } from './menu-item.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from "@angular/animations";
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms 0s ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  menuItemState = 'ready';

  @Input() menuItem: MenuItem;
  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitAddEvent(){
    this.add.emit(this.menuItem);
  }

}
