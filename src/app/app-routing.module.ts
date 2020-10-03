import { OrderComponent } from './order/order.component';
import { OrderSumaryComponent } from './order-sumary/order-sumary.component';
import { LoginComponent } from './security/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ReviwesComponent } from './restaurant-detail/reviwes/reviwes.component';
import { loggedinInGuard } from './security/loggedin.guard'
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'login/:to', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'restaurants/:id', component: RestaurantDetailComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'menu', component: MenuComponent },
      { path: 'reviews', component: ReviwesComponent }
    ]
  },
  { path: 'order', loadChildren: () => import("./order/order.module").then(m => m.OrderModule), canLoad: [loggedinInGuard], canActivate:[loggedinInGuard] },
  { path: 'order-sumary', component: OrderSumaryComponent, canActivate:[loggedinInGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
