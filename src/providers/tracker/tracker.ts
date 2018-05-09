import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController  } from 'ionic-angular';
import { FirebaseDataProvider } from '../firebase-data/firebase-data';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';


@Injectable()
export class TrackerProvider {

userid: string;
latitudep: number = -33.53624;
longitudep: number = 26.08704;
timestampp: number = 15109274772804;

constructor(public http: Http, public geolocation: Geolocation, private toastCtrl: ToastController,
              public fbd: FirebaseDataProvider, public afAuth: AngularFireAuth) {  
    
  // setInterval(()=>{ this.getUserGeo(); }, 300000);
   
   
   //This not accurate either
   //MAY NEED TO CONSIDER THIS
   // https://developers.google.com/maps/documentation/geolocation/intro
   /*
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition)        
    } else {
       // console.log("Geolocation is not supported by this browser");
    }
   */
} 

 showPosition(position){
  console.log(position.coords.latitude + "<br>Longitude: " + position.coords.longitude); 
 // alert (position.coords.latitude + "<br>Longitude: " + position.coords.longitude)
 }

  getUserGeo(){
     let  geoOptions = {enableHighAccuracy: true}; 
     this.geolocation.watchPosition(geoOptions)
                     .filter((p) => p.coords !== undefined) //Filter Out Errors
                     .subscribe(position => {
     console.log(position);

   this.afAuth.authState.subscribe(auth => {

      if(auth) {
        this.userid = auth.uid; // auth.uid; '-KjRQgnEeTJNIU8q60Rd'
/*
    setTimeout(() => {
    if (this.network.type === 'wifi') {
      console.log('we got a wifi connection, woohoo!');
    }
  }, 3000);
  */
        this.updateUserGeo(this.userid,position);        
    //    this.fbd.createUserDrive(this.userid,position); UNTIL GOT REST WORKING. LOOK AT AUDIT FUNCTION TOO IN ANGULARFIRE
       } else {
        console.log("Not Logged In")    
       }    
      
    });
    });
  }
  

  updateUserGeo( userid, position){

    this.fbd.updateUserProfileAllLatLng(); //DOES NOT DO ANY HARM SETTING HERE I THINK
     if (position.coords.accuracy > 1000 ) 
     {
       this.showToast('bottom', 'Oops! Location reading not accurate enough')
       // alert("Accuracy Really Poor") 
    }

    if (position.coords.accuracy < 1000 ){
        
        this.fbd.updateUserProfileLatLng(
           this.userid, position.coords.latitude, position.coords.longitude, position.timestamp, position.coords.accuracy,
           this.latitudep, this.longitudep, this.timestampp)
        //   console.log("accuracy: " + position.coords.accuracy) 
      }
   } 

   showToast(toastPosition: string, toastMessage) {
    const toast = this.toastCtrl.create({
      message: toastMessage,
      position: toastPosition,
      duration: 3000
    });
    // toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }

}
