import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonElementsModule } from '../common_elements/common-elements.module';
import { ClientContainerComponent } from './client-container/client-container.component';
import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './home/home.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { TrackingOrderComponent } from './tracking-order/tracking-order.component';
import { MaterialModule } from 'src/mat-modules';
import { ShareModule } from 'src/app/share/share.module';
import { OrderManagementComponent } from './order-management/order-management.component';

@NgModule({
  declarations: [
    ClientContainerComponent,
    HomeComponent,
    ItemDetailComponent,
    CheckOutComponent,
    CartComponent,
    RegisterComponent,
    TrackingOrderComponent,
    OrderManagementComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CommonElementsModule,
    MaterialModule,
    ShareModule,
  ],
  exports: [
    ClientContainerComponent,
    HomeComponent,
    ItemDetailComponent,
    CheckOutComponent,
    ClientRoutingModule,
    CartComponent,
    RegisterComponent,
    TrackingOrderComponent,
    OrderManagementComponent,
  ],
})
export class ClientModule {}
