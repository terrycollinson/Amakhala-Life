import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , ToastController } from 'ionic-angular';
// import { AngularFireDatabase } from 'angularfire2/database';
// import * as firebase from 'firebase';
import { WildlifeServiceProvider } from '../../../providers/wildlife-service/wildlife-service';
// import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-wildlife-taxonomy',
  templateUrl: 'wildlife-taxonomy.html',
})
export class WildlifeTaxonomyPage {

  searchTaxonomy: string; // = 'taxonomy';
  searchValue: string; // = 'Regnum';
  taxonomyList:any[] = [
    {taxonomy_level:'Aves', label_en: 'Birds', dbimage: './assets/wildlife/aves.jpg'},
    {taxonomy_level:'Amphibia', label_en: 'Amphibians', dbimage: './assets/wildlife/amphibia.jpg'},
    {taxonomy_level:'Mammalia', label_en: 'Mammals', dbimage: './assets/wildlife/mammalia.jpg'},
    {taxonomy_level:'Pisces', label_en: 'Fish', dbimage: './assets/wildlife/pisces.jpg'},
    {taxonomy_level:'Plantae', label_en: 'Plants', dbimage: './assets/wildlife/plantae.jpg'},
    {taxonomy_level:'Reptilia', label_en: 'Reptiles', dbimage: './assets/wildlife/reptilia.jpg'},
  ];
  viewType: string = "grid";


  constructor(public navCtrl: NavController, public navParams: NavParams, public wsp: WildlifeServiceProvider) {
    
     if (this.wsp.viewType.length > 0) {
       this.viewType= "list"
     }
            
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WildlifeTaxonomyPage');
  }

  drillDown(seachTaxonomy, searchValue){
    console.log(seachTaxonomy, searchValue);
    //this.searchTaxonomy = seachTaxonomy;
    //this.searchValue = searchValue;
    //this.wsp.fetchWildlife(searchTaxonomy,searchValue);
    //console.log(this.wsp.taxonomyListArray);
    switch (this.searchValue) {
        case "Regnum":this.searchTaxonomy = 'y';
        break;
        default:this.searchTaxonomy = 'y';
    }
  }

  

}
