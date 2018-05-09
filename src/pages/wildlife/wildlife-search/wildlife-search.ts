import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController,ViewController, ActionSheetController, LoadingController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { WildlifeServiceProvider } from '../../../providers/wildlife-service/wildlife-service';
//import * as firebase from 'firebase';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@IonicPage()
@Component({
  selector: 'page-wildlife-search',
  templateUrl: 'wildlife-search.html',
})

export class WildlifeSearchPage {

  wildlife: any
  filteredWildlife:  any =[];
  loading: any;

  label_en: string;
  binomial: string;
  dbimage; string;

  taxonomy: string = 'classis';
  taxonomylevel: string = 'Mammalia';

  searchTerm:    string = '';
  searchControl: FormControl;
  searching:     any = false;

  constructor(public navCtrl: NavController, public wsp: WildlifeServiceProvider,public modalCtrl:ModalController, 
              public loadingCtrl: LoadingController, public viewCtrl: ViewController, public actionsheetCtrl: ActionSheetController) { 
                this.searchControl = new FormControl();
                this.filteredWildlife = [];      
  }
  
   ionViewWillEnter(){
     this.getWildlifeLists(this.taxonomy,this.taxonomylevel); 
    }
    
    ionViewDidLoad() {          
      this.searchControl.valueChanges.debounceTime(700).subscribe(search => { 
           // this.searching = true;
            this.setFilteredWildlife(this.searchTerm); 
        }); 
         
     }

   getWildlifeLists(taxonomy, taxonomylevel){
    this.wsp.fetchWildlife(this.taxonomy,this.taxonomylevel);
    //By subscribing to the observable we can create arrays for filtering and watch for changes
     this.wsp.wildlife.subscribe(queriedItems => { 
     this.filteredWildlife = this.wsp.wildlifeListArray; 

     if (this.filteredWildlife.length > 0) {
     //this.loading.dismiss();
      }      
      }); 
     }

   selectWildlife(label_en, binomial, dbimage) {
    console.log("select Wildlife id = "+ binomial);
    let dataArray = {
      label_en: label_en,
      binomial: binomial,
      dbimage: dbimage
    };
    this.viewCtrl.dismiss(dataArray);
  }
  
  selectClassis(){
   // console.log("Clicked Set Direction");
   let actionSpeedSheet = this.actionsheetCtrl.create({
      title: 'Change Classis',
      cssClass: 'action-sheets',
      buttons: [
         {
          text: 'Mammals',
          icon: 'paw',
          handler: () => {
            this.taxonomy = "classis",
            this.taxonomylevel = "Mammalia"
          }
        },
        {
          text: 'Birds',
          icon: 'ai-bird',
          handler: () => {
            this.taxonomy = "classis",
            this.taxonomylevel = "Aves",
            this.getWildlifeLists(this.taxonomy, this.taxonomylevel)
          }
        },
       {
          text: 'Amphibians',
          icon: 'ai-frogtree',
          handler: () => {
            this.taxonomy = "classis",
            this.taxonomylevel = "Amphibia",
            this.getWildlifeLists(this.taxonomy, this.taxonomylevel)
          }
        },
       {
          text: 'Reptiles',
          icon: 'ai-snake',
          handler: () => {
            this.taxonomy = "classis",
            this.taxonomylevel = "Reptilia",
            this.getWildlifeLists(this.taxonomy, this.taxonomylevel)
          }
        },
       {
          text: 'Insects',
          icon: 'bug',
          handler: () => {
            this.taxonomy = "classis",
            this.taxonomylevel = "Insectia",
            this.getWildlifeLists(this.taxonomy, this.taxonomylevel)
          }
        },
        {
          text: 'Fish',
          icon: 'ai-fish',
          handler: () => {
            this.taxonomy = "classis",
            this.taxonomylevel = "Pisces",
            this.getWildlifeLists(this.taxonomy, this.taxonomylevel)
          }
        },
       {
          text: 'Plants',
          icon: 'ai-leaves',
          handler: () => {
            this.taxonomy = "regnum",
            this.taxonomylevel = "Plantae",
            this.getWildlifeLists(this.taxonomy, this.taxonomylevel)
          }
       }
      ]
    });
    actionSpeedSheet.present();
  }


  onSearchInput(){
    this.searching = true;
    }

  setFilteredWildlife(searchTerm) {
    
    console.log(searchTerm);
   if (searchTerm && searchTerm.trim() != ''){
     this.filteredWildlife = this.filteredWildlife.filter((wildlife)=>{
     return wildlife.label_en.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
     console.log(this.filteredWildlife);
    this.searching = false;
    }else{
     this.filteredWildlife = this.wsp.wildlifeListArray; 
    }
  }
  
}
