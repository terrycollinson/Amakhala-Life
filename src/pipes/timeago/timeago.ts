import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

/**
 * Generated class for the TimeagoPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'timeago',
})
export class TimeagoPipe implements PipeTransform {
  /*
   if (args.fromnow == true) {
      let timestring = moment(value).fromNow();
      return timestring;
    }
 */
  transform(value: string, ...args) {
    // return "Hello"
    let timestring = moment(value).fromNow();
      return timestring;
  }
}
