import { Pipe, PipeTransform } from '@angular/core';
import { ItemOrderModel } from 'src/app/models';

@Pipe({
  name: 'countItem',
})
export class CountItemPipe implements PipeTransform {
  transform(items: ItemOrderModel[]): unknown {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].quantity;
    }
    return total;
  }
}
