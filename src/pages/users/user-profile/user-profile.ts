import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../../providers/auth-data/auth-data';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import md5 from 'crypto-md5'; // dependencies:"crypto-md5";
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

    email: string;
    name: string;
    phone: string;
    profilePicture: any = "https://www.gravatar.com/avatar/"
    uid:any;
    user: any;
    timeago: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDb: AngularFireDatabase,
              public afAuth: AngularFireAuth, public authData: AuthData) {
   
   // If profile data passed use it
   if (this.navParams.get('name')){
      this.name = this.navParams.get('name');
      this.email = this.navParams.get('email');
      this.phone = this.navParams.get('phone');
      this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex'); 

   } else {

    //Get the user key and look up his profile 
    this.afAuth.authState.subscribe(userAuth => {
        if(userAuth) {
          this.uid = userAuth.uid;          
          this.user = this.afDb.object('/userProfile/'+this.uid ).valueChanges();
          this.user.subscribe(profile => {
          // console.log(profile);
            this.name = profile.name;
            this.email = profile.email;
            this.phone = profile.phone;
            this.user = profile;
            this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex'); 
            this.timeago = moment(this.user.timestamp).fromNow();
            return this.user;            
          })      
        } else {
          console.log('auth false');
        }
      // console.log("Here now");
     });
   }
   
    
  }

  ionViewDidLoad() {
    console.log('View Did Load UserProfilePage');
  }

  ionViewWillLoad() {
    console.log('View Will Load UserProfilePage');
  }

}
