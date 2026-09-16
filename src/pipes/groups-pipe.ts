import { Pipe, PipeTransform } from '@angular/core';
import { Group } from '../entities/group';

@Pipe({
  name: 'groups',
})
export class GroupsPipe implements PipeTransform {
  transform(value: Group[], type?: string): string {
    if (type === 'permissions') {
      return value.map(g => g.permissions.join(', ')).join('; ');
    }
    return value.map(g => g.name).join(', ');
  }
}
