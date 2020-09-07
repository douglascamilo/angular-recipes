export class User {

  constructor(
    public email: string,
    public password: string,
    private returnSecureToken = true
  ) {}
}
