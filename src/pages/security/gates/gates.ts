import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, , ActionSheetController, LoadingController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

export interface Vehicle { vehicle_reg: string; vehicle_type: string; no_persons: number; color: string; destination: string; active: boolean };
export interface VehicleId extends Vehicle { id: string; }
//01924 467 825
@IonicPage()
@Component({
  selector: 'page-gates',
  templateUrl: 'gates.html',
})
export class GatesPage {

  vehicleCollection: AngularFirestoreCollection<Vehicle>;
  vehicles: Observable<Vehicle[]>;
  vehiclesSnapshot: any;
  vehicle: Observable<Vehicle>;
  authState: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public modalCtrl:ModalController,
              public afs: AngularFirestore, public actionsheetCtrl: ActionSheetController, public afAuth: AngularFireAuth, public loadingCtrl: LoadingController) {
  
   this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.authState = true;
        console.log('auth true so can edit');
      } else {
        console.log('auth false');
        this.authState = false;
      }
    });

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: 'Hang on - loading data'
    });

   // loadingPopup.present();
    console.log("Here");
    this.vehicleCollection =  this.afs.collection('vehicles', ref => ref.orderBy('entryTime', 'desc'));
    console.log(this.vehicleCollection);
    console.log("Here Now");

    this.vehiclesSnapshot = this.vehicleCollection.valueChanges();
    console.log(this.vehiclesSnapshot);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GatesPage');
  }

  createVehicle(){
    if(this.authState){
      let GateFormModal = this.modalCtrl.create('GateFormPage');
          GateFormModal.present();
    }else{
      this.presentToast('bottom','No permission : Please login', 3000);     
    }
  }

  presentToast(position: string,message: string ,duration: number) {
    let toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }

   viewDestination(){
   // console.log("Clicked Set Direction");
   let actionSpeedSheet = this.actionsheetCtrl.create({
      title: 'Filter by Destination',
      cssClass: 'action-sheets',
      buttons: [
         {
          text: 'Hlosi',
          icon: 'ai-hlosi',
          handler: () => {
           // this.taxonomy = "classis",
           // this.taxonomylevel = "Mammalia"
          }
        },
        {
          text: 'Bou Bou Lodge',
          icon: 'ai-bird',
          handler: () => {
           // this.taxonomy = "classis",
           // this.taxonomylevel = "Aves",
           // this.getWildlifeLists(this.taxonomy, this.taxonomylevel)
          }
        },
       {
          text: 'Kraaibos',
          icon: 'ai-lionroars',
          handler: () => {
           // this.taxonomy = "classis",
           // this.taxonomylevel = "Amphibia",
          //  this.getWildlifeLists(this.taxonomy, this.taxonomylevel)
          }
        },
       {
          text: 'Kraaibos Village',
          icon: 'people',
          handler: () => {
           // this.taxonomy = "classis",
           // this.taxonomylevel = "Reptilia",
          //  this.getWildlifeLists(this.taxonomy, this.taxonomylevel)
          }
        },
       {
          text: 'Bukela',
          icon: 'ai-bukela',
          handler: () => {
           // this.taxonomy = "classis",
           // this.taxonomylevel = "Insectia",
           // this.getWildlifeLists(this.taxonomy, this.taxonomylevel)
          }
        }
      ]
    });
    actionSpeedSheet.present();
  }

}
