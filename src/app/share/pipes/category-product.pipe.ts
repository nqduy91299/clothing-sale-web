import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryProduct',
})
export class CategoryProductPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Shirt';
      case 2:
        return 'Coat';
      case 3:
        return 'Pant';
      default:
        return '---';
    }
  }
}
