import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User = {};

  constructor(
    public navCtrl: NavController,
    private _userProvider: UserProvider
  ) {
    console.log(this._userProvider.user);
    this.user = this._userProvider.user;
  }

}
