export class Profile {
  constructor({
    id = "",
    username = "",
    email = "",
    password = "",
    role = "",
  } = {}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

