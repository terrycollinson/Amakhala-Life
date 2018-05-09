import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
// import { AfoListObservable,   AfoObjectObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class WildlifeServiceProvider {

  wildlifeHero = firebase.initializeApp({
  databaseURL: "https://bou-bou-lodge.firebaseio.com",
  storageBucket: "bou-bou-lodge.appspot.com"
   }, "wildlifeHero");

  WildlifeHeroDb : any;
  wildlifeRef: any;
  wildlife: Observable<any>;
  wildlifeCollection: Observable<any>;
  wildlifeCollectionArray: any;
  wildlifeListArray: any;
  wildlifeListArrayReserve: any;

  wildlifeTaxRef: any;
  wildlifeTax: Observable<any>;
  taxonomy: Observable<any>;
  taxonomyListArray: any;

  loading: any;
    group: any;
  viewType: string = "";


  constructor(public http: Http,  public loadingCtrl: LoadingController, public afDb: AngularFireDatabase, public afs: AngularFirestore) {
    console.log('Hello Wildlife Service Provider');
    this.WildlifeHeroDb = this.wildlifeHero.database(); 
    this.wildlifeListArray = []; 
    // this.createWildlifeCollection() 
  }

  fetchWildlife(searchTaxonomy,searchValue){
  this.createLoading();
  this.wildlifeRef = this.WildlifeHeroDb.ref("/wildlife");
  this.wildlife = this.afDb.list(this.wildlifeRef, ref => ref.orderByChild(searchTaxonomy).equalTo(searchValue)).valueChanges();

  this.wildlife.subscribe(species => {
         //  console.log(species);
           this.wildlifeListArray = JSON.parse(JSON.stringify(species));

           this.wildlifeListArray = this.wildlifeListArray.sort(function(a, b) {
           return a.label_en.localeCompare(b.label_en);
               });

          this.wildlifeListArray = this.wildlifeListArray.map((wildlife)=>{
               wildlife.dbimage = "https://www.wildlifehero.com/images/wildlife/" + wildlife.dbimage + ".jpg";
          return wildlife
           });
          console.log(this.wildlifeListArray);
          this.viewType = "list";
          this.loading.dismiss();
           
            this.wildlifeListArrayReserve = this.wildlifeListArray.filter((wildlife)=>{
              return wildlife.notes_local != '';
           });
           console.log(this.wildlifeListArrayReserve);
     })  
  }

  fetchTaxonomy(searchTaxonomy, searchValue){
    console.log(searchTaxonomy +' ,' + searchValue);
  
    this.wildlifeTaxRef = this.WildlifeHeroDb.ref("/taxonomy");
    this.wildlifeTax = this.afDb.list(this.wildlifeTaxRef, ref => ref.orderByChild(searchTaxonomy).equalTo(searchValue)).valueChanges();
    // this.wildlifeTax = this.afDb.list(this.wildlifeTaxRef).valueChanges();

    this.wildlifeTax.subscribe(taxonomy => {
    // console.log(taxonomy);
    
    this.taxonomyListArray = JSON.parse(JSON.stringify(taxonomy));

    this.taxonomyListArray = this.taxonomyListArray.map((taxonomy)=>{
               taxonomy.dbimage = "https://www.wildlifehero.com/images/wildlife/" + taxonomy.dbimage + ".jpg";
          return taxonomy
           });

    this.taxonomyListArray = this.taxonomyListArray.sort(function(a, b) {
         return a.label_en.localeCompare(b.label_en);
         });
    console.log(this.taxonomyListArray)
       });

  }

  createLoading() {
  this.loading = this.loadingCtrl.create({
    content: 'Loading the list please wait :-)',
   // duration: 5000,
  });
  this.loading.present();
  }


    createWildlifeCollection(){  //REFUSES TO WORK
    this.wildlifeRef = this.WildlifeHeroDb.ref("/wildlife");
    this.wildlifeCollection = this.afDb.list(this.wildlifeRef, ref => ref.orderByChild('classis')).valueChanges();
    // console.log(this.wildlifeCollection);
    // console.log("Under");
   
    this.wildlifeCollection.subscribe(species => {
     let wildlifeCollectionRef = this.afs.collection("wildlife");
    this.wildlifeCollectionArray = JSON.parse(JSON.stringify(species));
     // console.log(this.wildlifeCollectionArray);
     console.log(this.wildlifeCollectionArray.length);
     wildlifeCollectionRef.add(this.wildlifeCollectionArray);
     
     wildlifeCollectionRef.doc("SF").set({
             name: "San Francisco", state: "CA", country: "USA",
             capital: false, population: 860000 });
      
        for (var i=0; i < this.wildlifeCollectionArray.length; i++) {
        //    console.log("Hello");
              console.log(this.wildlifeCollectionArray[i].binomial);
             console.log("In the loop");
             
          }

     });
    
    /*
    for (var i = 0; i < this.wildlifeCollectionArray.length; i++) {
    console.log(this.wildlifeCollectionArray.binomial[i]);
    console.log("In the loop");
     } 
   
    wildlifeCollectionRef.doc(this.wildlifeCollectionArray[i].dbimage).set({    
    classis: this.wildlifeCollectionArray[i].classis, 
    common_group: this.wildlifeCollectionArray[i].common_group, 
    conservationstatus: this.wildlifeCollectionArray[i].onservationstatus,
    dbimage: this.wildlifeCollectionArray[i].dbimage, 
    dbimageheight: this.wildlifeCollectionArray[i].dbimageheight, 
    familia: this.wildlifeCollectionArray[i].familia, 
    genus: this.wildlifeCollectionArray[i].genus,
    label_en: this.wildlifeCollectionArray[i].label_en,
    notes_fieldguide: this.wildlifeCollectionArray[i].notes_fieldguide,
    notes_general: this.wildlifeCollectionArray[i].notes_general,
    notes_local: this.wildlifeCollectionArray[i].notes_local,
    ordo: this.wildlifeCollectionArray[i].ordo,
    phylum: this.wildlifeCollectionArray[i].phylum,
    protected: this.wildlifeCollectionArray[i].protected,
    regnum: this.wildlifeCollectionArray[i].regnum,
    species: this.wildlifeCollectionArray[i].species,
    statuscode: this.wildlifeCollectionArray[i].statuscode,
    type: this.wildlifeCollectionArray[i].type, 
    binomial: this.wildlifeCollectionArray[i].binomial });
    */
  }
  /* TRIED THIS FOR GROUPING
   this.group  = this.groupBy(this.wildlifeListArray, pet => pet.classis);
            console.log(this.group);
            console.log(this.group.get("Aves"));

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
  }

  */
}

