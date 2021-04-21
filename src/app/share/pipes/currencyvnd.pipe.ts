import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyvnd',
})
export class CurrencyvndPipe implements PipeTransform {
  transform(value: number): string {
    if (value === undefined || value === null) {
      return '0';
    }
    let arr = value.toString().split('').reverse();
    const length = arr.length;

    for (let i = 0, j = 0; i < length; i++) {
      if (i !== 0 && i % 3 === 0) {
        arr.splice(i + j, 0, '.');
        j += 1;
      }
    }

    return arr.reverse().join('') + ' (VND)';
  }
}
