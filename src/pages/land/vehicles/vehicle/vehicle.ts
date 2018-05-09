import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController ,ToastController, ModalController, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthData } from '../../../../providers/auth-data/auth-data'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import moment from 'moment';

export interface Road { road_name: string; en_levels: string; en_polyline: string; active: boolean };
export interface RoadId extends Road { id: string; }

@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage {

  roadCollection: AngularFirestoreCollection<Road>;
  roads: Observable<Road[]>;
  roadsSnapshot: any;
  road: Observable<Road>;
  authState: boolean = false;

  userArray: any;
  user: any;
  userid: string;
  name: string;
  latitude: string;
  longitude: string;
  timeago: string;

  
  tab1: string;
  tab2: string;
  tab3: string;
  tab4: string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private toastCtrl: ToastController, public modalCtrl:ModalController, public alertCtrl: AlertController,
              public afs: AngularFirestore, public afAuth: AngularFireAuth, public afDB: AngularFireDatabase,
              public authData: AuthData) {

    this.tab1 = 'AfterLoginPage';
    this.tab2 = 'UserStatusPage';
    this.tab3 = 'UserSightingHistoryPage';
    this.tab4 = 'UserSettingsPage';
    
       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiclePage');  
   // this.addRoad();
   // this.updateRoad();
    }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(userAuth => {
        if(userAuth) {
          this.userid = userAuth.uid;   
          
          let loadingPopup = this.loadingCtrl.create({
            spinner: 'crescent', 
            content: 'Loading User Data'
          });
          loadingPopup.present();

          this.user = this.afDB.object('/userProfile/'+this.userid ).valueChanges();
          this.user.subscribe(profile => {
          console.log(profile);
          this.userArray = profile;
          console.log('Latitude' + this.userArray.latitude)
          this.name = profile.name;
          this.timeago = moment(profile.timestamp).fromNow(); 
          loadingPopup.dismiss()
          })
          

        } else {
          console.log('auth false');
          this.navCtrl.setRoot('LoginPage');
        }

      });
  }

  createSighting(){
    if(this.authState){
      let user = this.user;
      console.log(user.name);
      let sightingAddModal = this.modalCtrl.create('SightingNewPage', {user});
      sightingAddModal.present();
    }else{
      this.presentToast('bottom','No permission : Please login', 3000);     
    }
  }

  createEvent(){
    if(this.authState){
      let user = this.user;
      console.log(user.name);
      let eventAddModal = this.modalCtrl.create('EventNewPage', {user});
      eventAddModal.present();
    }else{
      this.presentToast('bottom','No permission : Please login', 3000);     
    }
  }

  updateRoad(road){
    if(this.authState){
      let VehicleUpdateModal = this.modalCtrl.create('VehicleUpdatePage', {road});
      VehicleUpdateModal.present();
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
