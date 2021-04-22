import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { AddressPipe } from './pipes/address.pipe';
import { CurrencyvndPipe } from './pipes/currencyvnd.pipe';
import { CountItemPipe } from './pipes/count-item.pipe';
import { CategoryProductPipe } from './pipes/category-product.pipe';
import { DatevnesePipe } from './pipes/datevnese.pipe';

@NgModule({
  declarations: [
    OrderStatusPipe,
    AddressPipe,
    CurrencyvndPipe,
    CountItemPipe,
    CategoryProductPipe,
    DatevnesePipe,
  ],
  imports: [CommonModule],
  exports: [
    OrderStatusPipe,
    AddressPipe,
    CurrencyvndPipe,
    CountItemPipe,
    CategoryProductPipe,
    DatevnesePipe,
  ],
})
export class ShareModule {}
