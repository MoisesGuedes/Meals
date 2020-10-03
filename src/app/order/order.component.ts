import { Router } from '@angular/router';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import { OrderService } from './order.service';
import { NotificationService } from './../shared/messages/notifications.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {tap} from 'rxjs/operators';
import { Order, OrderItem } from './order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  numberPattern = /^[0-9]*$/;

  orderForm: FormGroup;

  delivery: number = 8

  orderId: string

  constructor(
    private router: Router,
    private orderService: OrderService,
    private fb: FormBuilder,
    private notificationService:NotificationService) { }

  ngOnInit(): void {

    this.orderForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'blur'
      }),
      email: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      number: this.fb.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.fb.control(''),
      paymentOptions: this.fb.control('MON')
    }, { validators: [OrderComponent.equalsTo], updateOn: 'blur' })
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if (!email || !emailConfirmation) {
      return undefined
    }

    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true }
    }
    return undefined
  }


  itemsValues(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }

  emailsNotMatch(){
    if(this.orderForm.hasError('emailsNotMatch')){
      this.notificationService.notify('E-mails nao conferem', 'danger');
    }else{
      this.notificationService.close();
    }
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => {
        this.orderId = orderId;
      }))
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-sumary']);
        this.orderService.clear();
      });
  }

}
