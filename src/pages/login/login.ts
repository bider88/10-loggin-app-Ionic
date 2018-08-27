import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.model';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private _userProvider: UserProvider
  ) {
  }

  signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {

        const { displayName: name, email, photoURL: image, uid } = res.user;
        const provider = 'Facebook';

        const user: User = {
          name, email, image, uid, provider
        }

        this._userProvider.loadUser(user);

        this.navCtrl.setRoot(HomePage);
      });
  }

}
