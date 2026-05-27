export class Group {
  public static clone(g: Group): Group {
    return new Group(g.name, [...g.permissions], g.id);
  }

  constructor(
    public name: string,
    public permissions: string[] = [],
    public id?: number
  ){}
}