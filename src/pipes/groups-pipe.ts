import { Pipe, PipeTransform } from '@angular/core';
import { Group } from '../entities/group';

@Pipe({
  name: 'groups',
})
export class GroupsPipe implements PipeTransform {
  transform(value: Group[], type?: string): string {
    if (type === 'permissions') {
      const allPerms= value.map(g => g.permissions).flat();
      const setPerms = new Set(allPerms);
      return Array.from(setPerms).join(', ');
    }
    return value.map(g => g.name).join(', ');
  }
}
