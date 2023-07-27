import { UserTypes } from "./user-types.enum";

export class User {
  userType: UserTypes;
  name?: string;
  email?: string;

  constructor(userType: UserTypes, name?: string, email?: string) {
    this.userType = userType;
    this.name = name;
    this.email = email;
  }

  toPlainObject(): any {
    return {
      name: this.name,
      email: this.email || '', 
      userType: this.userType || '', 
    };
  }
}
