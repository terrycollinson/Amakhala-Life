import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WildlifeClassisPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wildlife-classis',
  templateUrl: 'wildlife-classis.html',
})
export class WildlifeClassisPage {

  photos: any[] = [];
  getIndex:number;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WildlifeClassisPage');
  }

}
