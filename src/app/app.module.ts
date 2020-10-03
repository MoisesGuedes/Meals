import { ApplicationErrorHandler } from './app.error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsModule }   from './icons/icons.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviwesComponent } from './restaurant-detail/reviwes/reviwes.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { SharedModule } from "./shared/shared.module";
import { OrderItemsComponent } from './order/order-items/order-items.component';
import { OrderItemComponent } from './order/order-item/order-item.component';
import { OrderSumaryComponent } from './order-sumary/order-sumary.component';
import { LoginComponent } from './security/login/login.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import locatePt from '@angular/common/locales/pt';

registerLocaleData(locatePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    MenuItemComponent,
    ReviwesComponent,
    ShoppingCartComponent,
    OrderSumaryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: ErrorHandler, useClass: ApplicationErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
