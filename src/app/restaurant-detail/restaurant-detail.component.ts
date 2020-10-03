import { RestaurantsService } from './../restaurants/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Restaurant } from '../restaurants/restaurant/restaurant.model';
import { NotificationService } from '../shared/messages/notifications.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  constructor(private restaurantService: RestaurantsService, private route: ActivatedRoute, private notificationService:NotificationService) { }

  kartState = 'hidden';

  reviews = false;

  restaurant: Restaurant;

  ngOnInit(): void {
    this.restaurantService.restaurantsById(
      this.route.snapshot.params['id']).subscribe(
        restaurant => this.restaurant = restaurant)
  }

  changeReviews(){
    this.reviews = !this.reviews;
  }


}
