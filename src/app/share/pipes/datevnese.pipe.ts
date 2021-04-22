import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datevnese',
})
export class DatevnesePipe implements PipeTransform {
  transform(date, format: string = 'DD/MM/YYYY') {
    if (!date) {
      return '---';
    }
    return moment(moment.utc(date).toDate()).format(format);
  }
}
