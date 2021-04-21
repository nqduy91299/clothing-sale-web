import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagementComponent } from './account-management/account-management.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      { path: 'orders-management', component: OrderManagementComponent },
      { path: 'accounts-management', component: AccountManagementComponent },
      {
        path: 'products-management',
        component: ProductManagementComponent,
        children: [
          { path: '', component: AllProductsComponent },
          { path: 'edit/:id', component: EditProductComponent },
          { path: 'detail/:id', component: DetailProductComponent },
          { path: 'create', component: CreateProductComponent },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
