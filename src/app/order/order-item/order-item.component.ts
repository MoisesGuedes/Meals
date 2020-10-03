import { CartItem } from './../../restaurant-detail/shopping-cart/cart-item.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";
@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  animations: [
    trigger('quantity', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({ opacity: 0, transform: 'translateX(-30px)', offset: 0 }),
        style({ opacity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
        style({ opacity: 1, transform: 'translateX(-0px)', offset: 1 })
      ]))),
      transition('ready => void', animate('300ms 0s ease-in', keyframes([
        style({ opacity: 1, transform: 'translateX(-0px)', offset: 0 }),
        style({ opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2 }),
        style({ opacity: 0, transform: 'translateX(-30px)', offset: 1 })
      ])))
    ]),
    trigger('buttons', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({ opacity: 0, transform: 'translateX(-0px)', offset: 0 }),
        style({ opacity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
        style({ opacity: 1, transform: 'translateX(-30px)', offset: 1 })
      ]))),
      transition('ready => void', animate('300ms 0s ease-in', keyframes([
        style({ opacity: 1, transform: 'translateX(-30px)', offset: 0 }),
        style({ opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2 }),
        style({ opacity: 0, transform: 'translateX(-0px)', offset: 1 })
      ])))
    ])
  ]

})
export class OrderItemComponent implements OnInit {

  rowState = 'ready';

  constructor() { }

  edit:boolean = false;
  @Input() item:CartItem;

  @Output() increaseQty = new EventEmitter<CartItem>()
  @Output() decreaseQty = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()

  ngOnInit(): void {
  }

  changeEdit(){
    this.edit = ! this.edit;
  }

  emitIncreaseQty() {
    this.increaseQty.emit(this.item);
  }

  emitDecreaseQty() {
    this.decreaseQty.emit(this.item);
  }

  emitRemove() {
    this.remove.emit(this.item);
  }

}
