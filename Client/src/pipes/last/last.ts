import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the LastPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'last',
  pure: false
})
export class LastPipe implements PipeTransform {

  transform(items: any[]): any {
    return items.length > 0 ? [items[items.length - 1]] : [];
  }
}

