import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthData } from '../../../providers/auth-data/auth-data';


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  tab1: string;
  tab2: string;
  tab3: string;
  tab4: string;
  tabParams: any;

  userParams: any;
  userParamsL: any;
  name: string;
  key: string;
  email: string;
  profile: any;
  profileL: any;
  selectedIndex: number;
  public backgroundImage: any = "./assets/bg1.jpg";
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData,
              public modalCtrl:ModalController, public afAuth: AngularFireAuth, public afDb: AngularFireDatabase) 
        {
    // Set the tab pages
    this.tab1 = 'UserProfilePage';
    this.tab2 = 'UserStatusPage';
    this.tab3 = 'UserSightingHistoryPage';
    this.tab4 = 'UserSettingsPage';
    this.selectedIndex = 0;
    
    // Pass on the user profile details if sent
    if ( this.navParams.get('user')) {
      this.userParams = this.navParams.get('user');     
      this.name = this.userParams.name;
      this.tabParams = { key: this.userParams.key, 
                      name: this.userParams.name, 
                      email: this.userParams.email, 
                      phone: this.userParams.phone, 
                      latitude: this.userParams.latitude,
                      longitude: this.userParams.longitude,
                      timestamp: this.userParams.timestamp,
                      accuracy: this.userParams.accuracy,
                      role: this.userParams.role,
                    };
      console.log(this.tabParams);
      } 
   
   }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad UserPage');
  }

  createSighting(){
      let sightingAddModal = this.modalCtrl.create('SightingNewPage', {key: this.key});
      sightingAddModal.present();
     }

  closeUserModal(){
   // console.log("Need to set root page here");
    this.navCtrl.push('ReserveMapPage');
  }

}
