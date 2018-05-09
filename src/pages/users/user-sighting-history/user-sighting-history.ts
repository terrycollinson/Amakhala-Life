import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { WildlifeServiceProvider } from '../../../providers/wildlife-service/wildlife-service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


export interface Sighting { road_name: string; en_levels: string; en_polyline: string; active: boolean };
export interface SightingId extends Sighting { id: string; }


@IonicPage()
@Component({
  selector: 'page-user-sighting-history',
  templateUrl: 'user-sighting-history.html',
})
export class UserSightingHistoryPage {

  sightingCollection: AngularFirestoreCollection<Sighting>;
  sightings: Observable<Sighting[]>;
  sightingsSnapshot: any;
  sighting: Observable<Sighting>;
  sightingsArray: any =[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore,
              public loadingCtrl: LoadingController) {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: 'Loading sightings'
    });
    // loadingPopup.present();

    this.sightingCollection =  this.afs.collection('userSightings', ref => ref.orderBy('timestamp', 'desc'));
    this.sightingsSnapshot = this.sightingCollection.valueChanges();
    console.log(this.sightingsSnapshot);
    this.sightingsSnapshot.subscribe(sightinginfo => {
         this.sightingsArray = JSON.parse(JSON.stringify(sightinginfo));
         console.log(this.sightingsArray);
    });

    /*
    this.sightingsSnapshot = this.sightingCollection.snapshotChanges().map(actions => {
      loadingPopup.dismiss()      
      return actions.map(a => {
        const data = a.payload.doc.data() as Sighting;
        const id = a.payload.doc.id;
        console.log(data)
        return { id, ...data };
      })      
     });
     console.log(this.sightingsSnapshot);
    */

      }

  ionViewWillLoad() {
    
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSightingHistoryPage');
  }

}
