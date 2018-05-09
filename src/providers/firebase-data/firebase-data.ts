import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// declare var google;

export interface Road { road_name: string; en_levels: string; en_polyline: string; active: boolean };
export interface RoadId extends Road { id: string; }


@Injectable()
export class FirebaseDataProvider {
  authState: boolean = true;

  userid: any;
  users: Observable<any>;
  userArray: any;
  userRef: AngularFireList<any>;

  roadCollection: AngularFirestoreCollection<Road>;
  roads: Observable<Road[]>;
  roadArray: any;
  road: Observable<Road>;

  constructor(public http: Http, public afs: AngularFirestore, public afAuth: AngularFireAuth,
              adb: AngularFireDatabase, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

    this.userRef = adb.list('userProfile');
    this.users = this.userRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });   
    this.users.subscribe(userinfo => {
         this.userArray = JSON.parse(JSON.stringify(userinfo));
    });

    //THIS IS SERVING NO PURPOSE AT THE MOMENT
    this.afAuth.authState.subscribe(auth => {
      if(auth) {
         this.authState = true;         
      //  console.log('auth true');
      } else {
        console.log('auth false');
      //  this.authState = false;
      }
    });

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: 'Hang on - loading data'
    });
    loadingPopup.present();

    this.roadCollection =  this.afs.collection('roads', ref => ref.orderBy('road_name', 'asc').limit(10)); 
    this.roads = this.roadCollection.valueChanges()
    this.roads.subscribe(roadDetails => {
           loadingPopup.dismiss();
           });
    

  }

  createUserDrive(userid,position){
    if(this.authState){

      this.afs.collection('userLocations').add({
         userid: userid,
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         timestamp: position.timestamp,
         accuracy: position.coords.accuracy,
         heading: position.coords.heading,
         speed: position.coords.speed    
            }).then( newUserDrive => {
            //Do something not sure what yet
            }, error => {
              console.log(error);
            });
     
    }else{
     // this.presentToast('bottom','No permission : Please login', 3000);     
    }
  }
  getUserProfileDetails(userid){
  // let userProfileRef = adb.database.object(`/userProfile/{userid}`); //PROBLEM HERE NOT SURE WE NEED THIS ???
  //  userProfileRef.subscribe(user => console.log(user));
    
  }


  updateUserProfileLatLng(userid, latitude, longitude, timestamp, accuracy, latitudep, longitudep, timestampp){
    this.userRef.update(userid, { 
    latitude: latitude, longitude: longitude, timestamp : timestamp, accuracy: accuracy,
    latitudep: latitudep, longitudep: longitudep, timestampp: timestampp })
     .then(function(){
      // NOT SURE WHY THIS DOES NOT WORK HERE  this.showPositionToast('bottom', 'User location updated succesfully')
     }).catch(function(error) {
     alert("Data could not be saved." + error);
     });
     this.showPositionToast('bottom', 'User location updated succesfully')
  }

  showPositionToast(toastPosition: string, toastMessage) {
    const toast = this.toastCtrl.create({
      message: toastMessage,
      position: toastPosition,
      duration: 3000
    });
    // toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }

  //Make the LatLng previous to same as current to prevent all markers moving
  updateUserProfileAllLatLng(){   
      this.users.subscribe(userinfo => {
      this.userArray = JSON.parse(JSON.stringify(userinfo));

         for (var i = 0; i < this.userArray.length; i++) { 
      
      let key = this.userArray[i].key;
      let lat = this.userArray[i].latitude;
      let lng = this.userArray[i].longitude;

     // console.log(key +' : '+ lat +' : '+ lng);
      this.userRef.update(key, { latitudep: lat, longitudep: lng })
      .then(function(){
      // alert("Data updated");  
      }).catch(function(error) {
      alert("Data could not be saved." + error);
      }); 
    }
    });
   
  }

}
