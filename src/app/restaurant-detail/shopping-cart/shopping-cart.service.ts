import { MenuItem } from './../menu-item/menu-item.model';
import { Injectable, NgZone } from '@angular/core';
import { CartItem } from './cart-item.model';
import { NotificationService } from '../../shared/messages/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private notificationService: NotificationService, private zone: NgZone) { }

  items: CartItem[] = [];

  clear(dontShowmessage?: boolean) {
    this.items = [];
    if (!dontShowmessage) {
      this.notificationService.notify(`Você removeu todos os item`, 'warning');
    }
  }

  total(): number {
    return this.items.map(item => item.value()).reduce((prev, value) => prev + value, 0);
  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
    this.notificationService.notify(`Você adicionou o item ${item.name}`, 'info');
  }

  increaseQty(item: CartItem) {
    item.quantity = item.quantity + 1;
  }

  decreaseQty(item: CartItem) {
    item.quantity = item.quantity - 1;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
    this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`, 'warning');
  }

}
