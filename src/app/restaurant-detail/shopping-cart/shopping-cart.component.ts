import { ShoppingCartService } from './shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        'max-width': '0'
      })),
      state('visible', style({
        'max-width': '400px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ]),
    trigger('row', [
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
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  private eventSubscription: Subscription;
  @Input() event: Observable<void>;
  kartState = 'hidden';

  rowState = 'ready'

  constructor(public shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.eventSubscription = this.event.subscribe(() => {
      this.openKart();
    })
  }

  openKart(){
    this.kartState = 'visible';
  }

  closeKart(){
    this.kartState = 'hidden';
  }

  items(): any[] {
    return this.shoppingCartService.items;
  }

  total(): number {
    return this.shoppingCartService.total();
  }

  clear() {
    this.shoppingCartService.clear();
  }

  removeItem(item: any) {
    this.shoppingCartService.removeItem(item)
  }

  addItem(item: any) {
    this.shoppingCartService.addItem(item);
  }

}
