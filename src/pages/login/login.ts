import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.model';
import { HomePage } from '../home/home';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    // Declara el modulo de Facebook en el app.module.ts
    private fb: Facebook,
    // Declara el modulo de GooglePlus en el app.module.ts
    private googlePlus: GooglePlus,
    private _userProvider: UserProvider
  ) {
  }

  signInGoogle() {

    this.googlePlus.login({
      'webClientId': '232130546968-canv082j4bm6g9grh9temvstp0os67id.apps.googleusercontent.com',
      'offline': true
    }).then( res => {

      firebase.auth().signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then( ( res: any ) => {

        console.log( JSON.stringify(res) );

        const { displayName: name, email, photoURL: image, uid } = res.user;
          const provider = 'Google';

          const user: User = {
            name, email, image, uid, provider
          }

          this._userProvider.loadUser(user);

          this.navCtrl.setRoot(HomePage);

      })
      .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));

    })
      .catch(err => console.error(err));

  }

  signInWithFacebook() {

    if (this.platform.is('cordova')) {

      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

        firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
        .then( ( res: any ) => {

          const { displayName: name, email, photoURL: image, uid } = res.user;
          const provider = 'Facebook';

          const user: User = {
            name, email, image, uid, provider
          }

          this._userProvider.loadUser(user);

          this.navCtrl.setRoot(HomePage);

        })
        .catch( err => console.log( JSON.stringify(err) ) );

      });

    }
    else {

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

}
