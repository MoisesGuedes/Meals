import { MenuItem } from './../restaurant-detail/menu-item/menu-item.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Restaurant } from "./restaurant/restaurant.model";
import { Observable } from 'rxjs';
import { API } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined
    if (search) {
      params = new HttpParams().append('q', search);
    }
    return this.http
      .get<Restaurant[]>(`${API}/restaurants`, { params: params });
  }

  restaurantsById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${API}/restaurants/${id}`);
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http.get(`${API}/restaurants/${id}/reviews`)
  }

  menuOfrestaurants(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${API}/restaurants/${id}/menu`)
  }


}
