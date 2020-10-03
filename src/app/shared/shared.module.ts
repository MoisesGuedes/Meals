import { AuthInterceptor } from './../security/auth.interceptor';
import { LeaveOrderGuard } from './../order/leave-order.guard';
import { loggedinInGuard } from './../security/loggedin.guard';
import { LoginService } from './../security/login/login.service';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { OrderService } from './../order/order.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notifications.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [InputComponent, SnackbarComponent],
  imports: [CommonModule,IconsModule, FormsModule, ReactiveFormsModule, IconsModule],
  exports: [
    InputComponent,
    SnackbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SnackbarComponent,
    IconsModule
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        OrderService,
        ShoppingCartService,
        RestaurantsService,
        NotificationService,
        LoginService,
        loggedinInGuard,
        LeaveOrderGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    }
  }
}


