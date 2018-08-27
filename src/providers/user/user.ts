import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable()
export class UserProvider {

  user: User = {};

  constructor() {}

  loadUser(user: User) {
    this.user = user;
  }

}
