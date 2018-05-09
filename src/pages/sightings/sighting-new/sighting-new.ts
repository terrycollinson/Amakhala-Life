import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPage, LoadingController, NavController, NavParams, ModalController, AlertController, Platform, ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthData } from '../../../providers/auth-data/auth-data'
import * as firebase from 'firebase';
// import { Observable } from 'rxjs/Observable';

export interface Sighting { label_en: string; binomial: string; visual: string; role: string };

@IonicPage()
@Component({
  selector: 'page-sighting-new',
  templateUrl: 'sighting-new.html',
})
export class SightingNewPage {

  userid: string;
  userName: string;
  user: any;
  latitude: number = -33.4;
  longitude: number = 20.08;
  accuracy: number;
  timestamp: number;
  timeago: any;

	sightingForm : FormGroup;
  sightings:  any;

  label_en: string = "";
  speciesImgProfile: string;
  dbimage:string;
  binomial: string;
  visibility: any;
  rate: any = 1;
  direction: string;
  speed: string;
  number: string;
  notes: string;
  sightingDate: number;

  incharge :string = "Open";
  // open: boolean = false;
  approach: boolean = true;
  standby: boolean = true;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public fb: FormBuilder, public geolocation: Geolocation,
             public afs: AngularFirestore, public modalCtrl:ModalController,public alertCtrl: AlertController,
             public platform: Platform, public actionsheetCtrl: ActionSheetController, 
             public authData: AuthData, public afAuth: AngularFireAuth, public afDb: AngularFireDatabase, public loadingCtrl: LoadingController) {
      
      this.sightingForm = fb.group({
          'number' : [null, Validators.compose([])],
          'direction' : [null, Validators.compose([])],
          'notes' : [null, Validators.compose([])],
        });

      /* THIS SHOULD BE NECESSARY IF TRACKER WORKING OK AND CAN CAUSE ISSUES
      geolocation.getCurrentPosition().then((position) => {
        if (position.coords.accuracy < 300 ) {
       this.latitude = position.coords.latitude;
       this.longitude = position.coords.longitude;
       this.geotimestamp = position.timestamp;
       this.accuracy = position.coords.accuracy;
        }
      });
     */

    // this.user = navParams.get('user'); WILL NOT WORK IF THIS PAGE ACCESSED FROM SIDE PANEL - WITHOUT WORK
    // console.log(this.user);  
     
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

          this.user = this.afDb.object('/userProfile/'+this.userid ).valueChanges();

          this.user.subscribe(profile => {
            //  Can do something else here if you want
            console.log(profile);
            this.userName = profile.name;
            this.accuracy = profile.accuracy;
            this.latitude = profile.latitude;
            this.longitude = profile.longitude;
            this.timestamp = profile.timestamp;
            this.timeago = profile.timestamp;
            loadingPopup.dismiss()
          })
          

        } else {
          console.log('auth false');
          this.navCtrl.setRoot('LoginPage');
        }

      });
      /* WILL WORK ON THIS LATER - Moving the function to the authdata provider
      this.authData.getUserProfile();
      console.log(this.authData.user)
      this.userName = this.authData.userName;
       */
  }


 // Visibility rating module
  onModelChange(e){
    this.visibility = e;
    console.log(e)
  }
  
	submitForm(value: any, user):void{
    console.log(value);
    console.log(user);
    this.sightingDate = Date.now();
    console.log(this.sightingDate);
      if(!this.label_en){
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Species name is required!',
              buttons: ['OK']
            });
            alert.present();
        }else{
            this.afs.collection('userSightings').add({
              userid: this.userid,
              userName:this.userName,
              binomial:this.binomial,
              label_en: this.label_en,
              dbimage: this.dbimage,
              visibility: this.visibility,
              number: this.number,
           //   direction: this.direction,
           //   speed: this.speed,
              notes: value.notes,
              latitude: this.latitude,
              longitude: this.longitude,
              incharge: this.userName,
              open: false,
              approach: true,
              standby: true,
              timestamp: this.sightingDate,
              // distance: value.distance,
              createdDate: firebase.database.ServerValue.TIMESTAMP,
               }).then( newSighting => {
                 console.log (newSighting);
              //this.navCtrl.setRoot('ReserveMapPage');
              this.navCtrl.setRoot('UserPage');
            }, error => {
              console.log(error);
            });
        }
	}	

 selectSpecies() {
   let speciesModal = this.modalCtrl.create('WildlifeSearchPage');
        speciesModal.onDidDismiss(dataArray => {
            this.label_en = dataArray.label_en; 
            this.binomial = dataArray.binomial;
            this.dbimage  = dataArray.dbimage;
        });
        speciesModal.present();
 }

  selectNumber(ev: any) {
    console.log('Changed', ev.value);
    this.number = ev.value;
  }

  /* PUT IT IN THE NOTES
 selectDirection(){
   // console.log("Clicked Set Direction");
   let actionSheet = this.actionsheetCtrl.create({
     // title: 'Direction',
      cssClass: 'action-sheets',
      buttons: [
         {
          text: 'Stationary',
          icon: 'arrow-up',
          handler: () => {
            this.direction = "Stationary";
          }
        },
        {
          text: 'North',
          icon: 'arrow-up',
          handler: () => {
            this.direction = "North";
          }
        },
        {
          text: 'North East',
          icon: !this.platform.is('ios') ? 'ion-arrow-graph-up-right' : null,
          handler: () => {
            this.direction = "North East";
          }
        },
       
         {
          text: 'East',
          icon: 'arrow-forward',
          handler: () => {
            this.direction = "East";
          }
        },

        {
          text: 'South East',
          icon: 'arrow-graph-down-right',
          handler: () => {
            this.direction = "South East";
          }
        },

         {
          text: 'South',
          icon: 'arrow-down',
          handler: () => {
            console.log('South');
            this.direction = "South";
          }
        },
        {
          text: 'South West',
          icon: 'arrow-graph-down-left',
          handler: () => {
            this.direction = "South West";
          }
        },
        {
          text: 'West',
         icon: 'arrow-back',
          handler: () => {
           this.direction = "West";
          }
        },
        {
          text: 'North West',
          icon: 'arrow-graph-up-left',
          handler: () => {
           this.direction = " North West";
          }
        }
      ]
    });
    actionSheet.present();
  }

  selectSpeed(){
   // console.log("Clicked Set Direction");
   let actionSpeedSheet = this.actionsheetCtrl.create({
      title: 'Speed',
      cssClass: 'action-sheets',
      buttons: [
         {
          text: 'Stationary',
          icon: 'arrow-up',
          handler: () => {
            this.speed = "Stationary";
          }
        },
        {
          text: 'Slowly',
          icon: 'arrow-up',
          handler: () => {
            this.speed = "Slowly";
          }
        },
       
         {
          text: 'Quickly',
          icon: 'arrow-forward',
          handler: () => {
            this.speed = "Quickly";
          }
        }
      ]
    });
    actionSpeedSheet.present();
  }

  selectNumber(){
  
   let actionNumberSheet = this.actionsheetCtrl.create({
       title: 'Number',
      cssClass: 'action-sheets',
      buttons: [
         {
          text: 'One',
          icon: 'arrow-up',
          handler: () => {
            this.number = "One";
          }
        },
         {
          text: 'Group',
          icon: 'arrow-up',
          handler: () => {
            this.number = "Group";
          }
        },
        {
          text: 'Family',
          icon: 'arrow-up',
          handler: () => {
            this.number = "Family";
          }
        },
       
         {
          text: 'Herd',
          icon: 'arrow-forward',
          handler: () => {
            this.number = "Herd";
          }
        }
      ]
    });
    actionNumberSheet.present();
  }
 */
/* */
}
