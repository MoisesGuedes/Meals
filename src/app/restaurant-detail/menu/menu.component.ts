import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from './../../restaurants/restaurants.service';
import { MenuItem } from './../menu-item/menu-item.model';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  eventSubject: Subject<void> = new Subject<void>();

  menu: Observable<MenuItem[]>

  constructor(
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute,
    private shoppingCart: ShoppingCartService
    ) { }

  ngOnInit(): void {
    this.menu = this.restaurantService.menuOfrestaurants(this.route.parent.snapshot.params['id']);
  }

  openKart(){
    this.eventSubject.next();
  }

  shoppingCartLength(): number{
    return this.shoppingCart.items.length;
  }

}
