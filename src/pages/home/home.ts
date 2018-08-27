import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.model';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User = {};

  constructor(
    public navCtrl: NavController,
    private _userProvider: UserProvider,
    private afAuth: AngularFireAuth
  ) {
    console.log(this._userProvider.user);
    this.user = this._userProvider.user;

    // Verificamos el usuario está logueado si es null es que no se encuentra logueado
    this.afAuth.authState.subscribe( user => {
      console.log('AfAuth');
      console.log( JSON.stringify(user) );
    });
  }

  logout() {
    this.afAuth.auth.signOut().then( res => {
      this._userProvider.user = {};
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
