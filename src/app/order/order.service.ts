import { NotificationService } from './../shared/messages/notifications.service';
import { Observable } from 'rxjs';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from "./order.model";
import { API } from "../app.api";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private http: HttpClient) { }


  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }

  itemsValue(): number {
    return this.cartService.total();
  }

  clear() {
    this.cartService.clear(true);
  }

  checkOrder(order: Order): Observable<string> {
    return this.http.post<Order>(`${API}/orders`, order)
      .pipe(map(order => order.id));
  }


}
