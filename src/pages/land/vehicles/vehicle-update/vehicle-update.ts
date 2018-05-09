import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';


export interface Road { road_name: string; en_levels: string; en_polyline: string; active: boolean };

@IonicPage()
@Component({
  selector: 'page-vehicle-update',
  templateUrl: 'vehicle-update.html',
})
export class VehicleUpdatePage {
	roadForm : FormGroup;

  roadDocument: AngularFirestoreDocument<Road>;
  road: any;
  id: string;
  
  
  road_name: string = "";
  active: string;
  en_polyline: string;
  en_levels: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,public fb: FormBuilder, public viewCtrl: ViewController,
  public afs: AngularFirestore, public modalCtrl:ModalController,public alertCtrl: AlertController) {

    this.road = navParams.get('road');
    console.log(this.road);
    this.road_name = this.road.road_name;
    this.en_polyline = this.road.en_polyline;
    this.en_levels = this.road.en_levels;
    this.active = this.road.active;
    this.id = this.road.id;
    
    this.roadForm = fb.group({
          'road_name' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
          'en_polyline' : [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(500)])],
          'en_levels' : [null, Validators.compose([Validators.required, Validators.minLength(2)])]
    })  

  }

	submitForm(value: any):void{
     this.afs.collection('roads').doc(this.id).update({
         road_name: value.road_name,
         active: true,
         en_levels: value.en_levels,
         en_polyline: value.en_polyline    
            }).then( newRoad => {
              this.viewCtrl.dismiss();
              this.navCtrl.setRoot('VehiclePage');
            }, error => {
              console.log(error);
            });
  }

}
