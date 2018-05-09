import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController ,ToastController, ModalController, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface Road { road_name: string; en_levels: string; en_polyline: string; active: boolean };
export interface RoadId extends Road { id: string; }

@IonicPage()
@Component({
  selector: 'page-roads',
  templateUrl: 'roads.html',
})
export class RoadsPage {
roadCollection: AngularFirestoreCollection<Road>;
  roads: Observable<Road[]>;
  roadsSnapshot: any;
  road: Observable<Road>;
  authState: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private toastCtrl: ToastController, public modalCtrl:ModalController, public alertCtrl: AlertController,
              public afs: AngularFirestore, public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.authState = true;
        console.log('auth true');
      } else {
        console.log('auth false');
        this.authState = false;
      }
    });

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: 'Hang on - loading data'
    });
    loadingPopup.present();
    
    this.roadCollection =  this.afs.collection('roads', ref => ref.orderBy('road_name', 'asc'));

    this.roadsSnapshot = this.roadCollection.snapshotChanges().map(actions => {
      loadingPopup.dismiss()
      return actions.map(a => {
        const data = a.payload.doc.data() as Road;
        const id = a.payload.doc.id;
      // console.log(data)
        return { id, ...data };
      })
     });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoadPage');  
  
    }

  ionViewWillLoad(){

  }

  createRoad(){
    if(this.authState){
      // this.navCtrl.push('VehicleFormPage'); 
      let RoadAddModal = this.modalCtrl.create('RoadnewPage');
      RoadAddModal.present();
    }else{
      this.presentToast('bottom','No permission : Please login', 3000);     
    }
  }

  updateRoad(road){
    if(this.authState){
      let RoadUpdateModal = this.modalCtrl.create('RoadUpdatePage', {road});
      RoadUpdateModal.present();
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

   deleteRoadConfirm(road) {
    let alert = this.alertCtrl.create({
      title: road.road_name,
      message: 'You sure you want to delete this road ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
             }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked for : ' + road.id);
            this.deleteRoad(road.id);
          }
        }
      ]
    });
    alert.present();
  }

  deleteRoad(id) {
     if(this.authState){
       console.log('Here: -' + id);
       this.roadCollection.doc(id).delete();
    }else{
      this.presentToast('bottom','No permission : Please login', 3000);     
    }
   
  }

}