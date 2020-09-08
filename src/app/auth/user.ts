export class User {
  public readonly returnSecureToken = true;

  constructor(
    public email: string,
    public password: string,
  ) {}
}
