import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the LastElementPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'lastElement',
})
export class LastElementPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], exclusive: boolean): any {
    if (exclusive) { return items.slice(0, items.length - 1); }
    return [items[items.length - 1]];
  }
}
