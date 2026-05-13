export class User {
  
  public static clone(user: User): User {
    return new User(user.name, user.email, user.id, user.lastLogin, user.password);
  }

  constructor(
    public name: string,
    public email: string,
    public id?: number,
    public lastLogin?: Date,
    public password = ''
  ){}

  toString() {
    return (this.id || '?') + ': ' +this.name + ', ' + this.email;
  }
}