import { Observable } from 'rxjs';
import { RestaurantsService } from './../../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviwes',
  templateUrl: './reviwes.component.html',
  styleUrls: ['./reviwes.component.css']
})
export class ReviwesComponent implements OnInit {

  reviews: Observable<any>;

  constructor(
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reviews = this.restaurantService.reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
  }

}
