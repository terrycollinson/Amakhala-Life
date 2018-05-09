import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMapsProvider } from '../../../providers/google-maps/google-maps';

@IonicPage()
@Component({
  selector: 'page-map-marker-options',
  templateUrl: 'map-marker-options.html',
})
export class MapMarkerOptionsPage {

  vehicle: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public maps: GoogleMapsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapMarkerOptionsPage');
  }

  closeModal() {
        this.navCtrl.pop();
    }
  

}
