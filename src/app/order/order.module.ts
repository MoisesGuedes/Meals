import { OrderItemComponent } from './order-item/order-item.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module"
import { OrderComponent } from "./order.component";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { LeaveOrderGuard } from "./leave-order.guard";

const ROUTES: Routes = [
    { path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard] }
]

@NgModule({
    declarations: [OrderComponent, OrderItemsComponent, OrderItemComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})

export class OrderModule { }
