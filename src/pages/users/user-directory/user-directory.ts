import { Component } from '@angular/core';
import { IonicPage, ActionSheetController, ModalController, LoadingController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthData } from '../../../providers/auth-data/auth-data';
import { Observable } from 'rxjs/Observable';
import { CallNumber } from '@ionic-native/call-number'; 
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-user-directory',
  templateUrl: 'user-directory.html',
})
export class UserDirectoryPage {

    contact: Observable<any[]>;
    contactArray : any=[]; 
    contactList : any=[]; // store firebase data to local array
    loadedContactList:  any=[]; 
    
    constructor( public loadingCtrl: LoadingController, public actionsheetCtrl: ActionSheetController, public afDB: AngularFireDatabase, public callNumber: CallNumber  ) {
  
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', // icon style //
        content: ''
      });
      loadingPopup.present();
      this.contact = afDB.list('/userContacts').valueChanges();
      this.contact.subscribe(contact => {
            this.contactArray = contact;
            this.contactList = this.contactArray; // for ngFor loop 
            this.loadedContactList = this.contactArray; 
            loadingPopup.dismiss()
      })
        
  }


  initializeItems(){
    this.contactList = this.loadedContactList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    this.contactList = this.contactList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.contactList.length);

  }

   phone(){
        this.callNumber.callNumber("948XXXXXX3", true)
          .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer'));
           }

  viewEmployers(){
    console.log("To Do");
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

