import { Pipe, PipeTransform } from '@angular/core';
import { ApiCheckoutService } from 'src/app/services/api-checkout.service';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(id: string): string {
    return null;
  }
}
