import { RestaurantsService } from './restaurants.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { Restaurant } from './restaurant/restaurant.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { from } from "rxjs";
import { switchMap, debounceTime, distinctUntilChanged, catchError, tap } from "rxjs/operators";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden';
  restaurants: Restaurant[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantsService: RestaurantsService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.restaurantsService
      .restaurants()
      .subscribe(restaurants => (this.restaurants = restaurants));

    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(serachTerm =>
        this.restaurantsService.restaurants(serachTerm)
          .pipe(catchError(error => from([]))))
    ).subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
