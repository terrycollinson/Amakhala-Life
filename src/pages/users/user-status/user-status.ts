import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-user-status',
  templateUrl: 'user-status.html',
})
export class UserStatusPage {

  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  timeago: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
   this.latitude = this.navParams.get('latitude');
   this.longitude = this.navParams.get('longitude');
   this.accuracy = this.navParams.get('accuracy');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserStatusPage');
  }

}
