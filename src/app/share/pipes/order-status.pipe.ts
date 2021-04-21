import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: number): String {
    switch (value) {
      case -2:
        return 'Shipping is canceled';
      case -1:
        return 'Order is canceled';
      case 0:
        return 'Ordered successfully';
      case 1:
        return 'Store confirmed';
      case 2:
        return 'Delivering';
      default:
        return '';
    }
  }
}
