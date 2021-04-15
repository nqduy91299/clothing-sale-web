import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountContainerComponent } from '../common_elements/account-container/account-container.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ClientContainerComponent } from './client-container/client-container.component';
import { HomeComponent } from './home/home.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TrackingOrderComponent } from './tracking-order/tracking-order.component';

const routes: Routes = [
  {
    path: '',
    component: ClientContainerComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: ':id/profile',
        component: AccountContainerComponent,
      },
      {
        path: ':id/cart',
        component: CartComponent,
      },
      {
        path: 'tracking-order/:id',
        component: TrackingOrderComponent,
      },
      {
        path: 'product/:id',
        component: ItemDetailComponent,
      },
      {
        path: 'checkout',
        component: CheckOutComponent,
      },
      {
        path: 'checkout/:id/:size_id/:quantity',
        component: CheckOutComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
