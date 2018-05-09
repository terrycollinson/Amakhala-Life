import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Vehicle { vehicle_reg: string; vehicle_type: string; vehicle_make: string; vehicle_make_icon: string; no_persons: number; color: string; destination: string; active: boolean };

@IonicPage()
@Component({
  selector: 'page-gate-form',
  templateUrl: 'gate-form.html',
})
export class GateFormPage {

  vehicleForm : FormGroup;
  vehicleDocument: AngularFirestoreDocument<Vehicle>;
  vehicle: Observable<Vehicle>;

  vehicle_reg: string; 
  vehicle_type: string ='Car'; 
  vehicle_make: string; 
  vehicle_make_icon: string;
  vehicle_icon: string ='car';
  no_persons: number = 1; 
  color: string = 'black'; 
  destination: string = 'Passing Through'; 
  active: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, 
              public viewCtrl: ViewController, public actionsheetCtrl: ActionSheetController, public afs: AngularFirestore) {

    this.vehicleForm = fb.group({
          'vehicle_reg' : [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])],
         // 'vehicle_type' : [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])],
         // 'color' : [null, Validators.compose([Validators.required])],
        //  'destination' : [null, Validators.compose([Validators.required, Validators.minLength(4)])],
        //  'no_persons' : [null, Validators.compose([Validators.required])],
          
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GateFormPage');
  }

  submitForm(value: any):void{
    console.log("submitted");
    console.log(value);
     this.afs.collection('vehicles').add({
         vehicle_reg: value.vehicle_reg,
         vehicle_type: this.vehicle_type,
         vehicle_make: this.vehicle_make,
         vehicle_make_icon: this.vehicle_make_icon,
         vehicle_icon: this.vehicle_icon,
         color: this.color,
         entryTime: Date.now(),
         active: true,
         no_persons: this.no_persons,
         destination: this.destination    
            }).then( newVehicle => {
             // this.viewCtrl.dismiss();
              this.navCtrl.pop();
            //  this.navCtrl.setRoot('GatesPage');
            }, error => {
              console.log(error);
            });
  }

  closeModal() {
        this.navCtrl.pop();
    }

  selectVehicleType(){
   console.log("Clicked Set Vehicle Type");
   let actionSpeedSheet = this.actionsheetCtrl.create({
      title: 'Vehicle Type',
      cssClass: 'action-sheets',
      buttons: [
         {
          text: 'Car',
          icon: 'car',
          handler: () => {
            this.vehicle_type = "Car";
            this.vehicle_icon = "car";
          }
        },
        {
          text: 'SUV',
          icon: 'ai-suv',
          handler: () => {
            this.vehicle_type = "SUV";
            this.vehicle_icon = "ai-suv";
          }
        },

        {
          text: 'Bakkie',
          icon: 'ai-bakkie2',
          handler: () => {
            this.vehicle_type = "Bakkie";
            this.vehicle_icon = "ai-bakkie2";
          }
        },

        {
          text: 'Bus',
          icon: 'ai-bus',
          handler: () => {
            this.vehicle_type = "Bus";
            this.vehicle_icon = "ai-bus";
          }
        },

        {
          text: 'Van',
          icon: 'ai-pickup',
          handler: () => {
            this.vehicle_type = "Van";
            this.vehicle_icon = "ai-pickup";
          }
        },

        {
          text: 'Tanker',
          icon: 'ai-tanker',
          handler: () => {
            this.vehicle_type = "ai-tanker";
            this.vehicle_icon = "ai-tanker";
          }
        }
      ]
    });
    actionSpeedSheet.present();
  }

  selectVehicleMake(){
    // http://www.car-logos.org/
   console.log("Clicked Set Vehicle Make");
   let actionSpeedSheet = this.actionsheetCtrl.create({
      title: 'Vehicle Make',
      cssClass: 'action-sheets',
      buttons: [
         {
          text: 'Audi',
        //  icon: 'car',
          handler: () => {
            this.vehicle_make = "Audi";
            this.vehicle_make_icon = "audi.png";
          }
        },

        {
          text: 'BMW',
        //  icon: 'car',
          handler: () => {
            this.vehicle_make = "BMW";
            this.vehicle_make_icon = "bmw.jpg";
          }
        },

        {
          text: 'Chevrolet',
         // icon: 'car',
          handler: () => {
            this.vehicle_make = "Chevrolet";
            this.vehicle_make_icon = "chevrolet.png";
          }
        },

        {
          text: 'Hyundai',
        //  icon: 'ai-suv',
          handler: () => {
            this.vehicle_make = "Hyundai";
            this.vehicle_make_icon = "hyundai.png";
          }
        },

        {
          text: 'Jeep',
        //  icon: 'car',
          handler: () => {
            this.vehicle_make = "Jeep";
            this.vehicle_make_icon = "jeep.png";
          }
        },

        {
          text: 'Mazda',
         // icon: 'car',
          handler: () => {
            this.vehicle_make = "Mazda";
            this.vehicle_icon = "mazda.png";
          }
        },

        {
          text: 'Nissan',
         // icon: 'car',
          handler: () => {
            this.vehicle_make = "Nissan";
            this.vehicle_make_icon = "nissan.png";
          }
        },

        {
          text: 'Opel',
          //icon: 'car',
          handler: () => {
            this.vehicle_make = "Opel";
            this.vehicle_make_icon = "car";
          }
        },

        {
          text: 'Other',
          //icon: 'car',
          handler: () => {
            this.vehicle_make = "Other";
            this.vehicle_make_icon = "other.png";
          }
        },

        {
          text: 'Volkswagen',
          // icon: 'car',
          handler: () => {
            this.vehicle_make = "Volkswagen";
            this.vehicle_make_icon = "vw.jpg";
          }
        },

        {
          text: 'Volvo',
        //  icon: 'car',
          handler: () => {
            this.vehicle_make = "Volvo";
            this.vehicle_make_icon = "volvo.jpg";
          }
        }

              ]
    });
    actionSpeedSheet.present();
  }


  selectNumber(ev: any) {
    console.log('Changed', ev.value);
    this.no_persons = ev.value;
  }

  selectDestination(){
   console.log("Clicked Set Destination");
   let actionSpeedSheet = this.actionsheetCtrl.create({
      title: 'Destination',
      cssClass: 'action-sheets',
      buttons: [
         {
          text: 'Passing Through',
          icon: 'arrow-up',
          handler: () => {
            this.destination = "Passing";
          }
        },
        {
          text: 'Hlosi',
          icon: 'ai-hlosi',
          handler: () => {
            this.destination = "Hlosi";
          }
        },

        {
          text: 'Bou Bou Lodge',
          icon: 'ai-bird',
          handler: () => {
            this.destination = "Hlosi";
          }
        },
       
         {
          text: 'Kraaibosch',
          icon: 'ai-lionroars',
          handler: () => {
            this.destination = "Kraaibosch";
          }
        },
       
         {
          text: 'Kraaibosch Village',
          icon: 'people',
          handler: () => {
            this.destination = "Kraaibosch Village";
          }
        },
       
         {
          text: 'Bukela',
          icon: 'ai-bukela',
          handler: () => {
            this.destination = "Bukela";
          }
        }
      ]
    });
    actionSpeedSheet.present();
  }

   selectColor(){
   console.log("Clicked Set Color");
   let actionSpeedSheet = this.actionsheetCtrl.create({
      title: 'Vehicle Colour',
      cssClass: 'action-sheets',
      buttons: [
         {
          text: 'Red',
          icon: 'color-palette',
          handler: () => {
            this.color = "red";
          }
        },
        {
          text: 'Green',
          icon: 'color-palette',
          handler: () => {
            this.color = "green";
          }
        },

        {
          text: 'Blue',
          icon: 'color-palette',
          handler: () => {
            this.color = "blue";
          }
        },
       
         {
          text: 'Black',
          icon: 'color-palette',
          handler: () => {
            this.color = "black";
          }
        },
       
         {
          text: 'White',
          icon: 'color-palette',
          handler: () => {
            this.color = "gray";
          }
        },
       
         {
          text: 'Silver',
          icon: 'color-palette',
          handler: () => {
            this.color = "#C0C0C0";
          }
        },
       
         {
          text: 'Gold',
          icon: 'color-palette',
          handler: () => {
            this.color = "gold";
          }
        }
      ]
    });
    actionSpeedSheet.present();
  }

}
