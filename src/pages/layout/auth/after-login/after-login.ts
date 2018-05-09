import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController ,ToastController} from 'ionic-angular';
import { AuthData } from '../../../../providers/auth-data/auth-data';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import md5 from 'crypto-md5'; // dependencies:"crypto-md5"

@IonicPage()
@Component({
  selector: 'page-after-login',
  templateUrl: 'after-login.html'
})
export class AfterLoginPage {

    email: any;
    profilePicture: any = "https://www.gravatar.com/avatar/"
    profile: Observable<any>;
    uid:any;
    user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData,
  public alertCtrl: AlertController,public loadingCtrl: LoadingController,
  private toastCtrl: ToastController,public afAuth: AngularFireAuth, public afDb: AngularFireDatabase) {
   // this.user = this.navParams.get('tabParams');
   // alert(this.navParams.get('email'));
    //console.log(this.user);

  }

  ionViewWillLoad(){
      this.afAuth.authState.subscribe(userAuth => {
        if(userAuth) {
          this.uid = userAuth.uid;     
          this.email = userAuth.email;
          this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex');

          let loadingPopup = this.loadingCtrl.create({
            spinner: 'crescent', 
            content: ''
          });
          loadingPopup.present();

          this.profile = this.afDb.object('/userProfile/'+this.uid ).valueChanges();

          this.profile.subscribe(profile => {
            //  Can do something else here if you want
              loadingPopup.dismiss()
          })
          

        } else {
          console.log('auth false');
          this.navCtrl.setRoot('LoginPage');
        }

      });
  }

  logout(){
        this.authData.logoutUser()
        .then( authData => {
          console.log("Logged out");
          // toast message
          this.presentToast('bottom','You are now logged out');
          this.navCtrl.setRoot('LoginPage');
        }, error => {
          var errorMessage: string = error.message;
          console.log(errorMessage);
          this.presentAlert(errorMessage);
        });
  }

  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(position: string,message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: 3000
    });
    toast.present();
  }

}
