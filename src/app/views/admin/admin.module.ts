import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/mat-modules';
import { ShareModule } from 'src/app/share/share.module';
import { OrderManagementComponent } from './order-management/order-management.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { LoginComponent } from './login/login.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';

@NgModule({
  declarations: [
    DashboardComponent,
    OrderManagementComponent,
    AccountManagementComponent,
    ProductManagementComponent,
    LoginComponent,
    AllProductsComponent,
    EditProductComponent,
    CreateProductComponent,
    DetailProductComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, MaterialModule, ShareModule],
  exports: [
    AdminRoutingModule,
    DashboardComponent,
    OrderManagementComponent,
    AccountManagementComponent,
    ProductManagementComponent,
    LoginComponent,
    AllProductsComponent,
    EditProductComponent,
    CreateProductComponent,
    DetailProductComponent,
  ],
})
export class AdminModule {}
