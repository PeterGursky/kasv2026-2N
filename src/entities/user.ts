import { Group } from "./group";

export class User {
  
  public static clone(user: User): User {
    return new User(user.name, user.email, user.id, user.lastLogin, user.password, user.active, user.groups ? user.groups.map(g => Group.clone(g)) : []);
  }

  constructor(
    public name: string,
    public email: string,
    public id?: number,
    public lastLogin?: Date,
    public password = '',
    public active = true,
    public groups: Group[] = []
  ){}

  toString() {
    return (this.id || '?') + ': ' +this.name + ', ' + this.email;
  }
}