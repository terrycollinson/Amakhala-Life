import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { NetworkConnectionProvider } from '../../providers/network-connection/network-connection';
// import { GoogleMapsClusterProvider } from '../../providers/google-maps-cluster/google-maps-cluster';
// public mapCluster: GoogleMapsClusterProvider,
declare var google;

@IonicPage()
@Component({
  selector: 'page-reserve-map',
  templateUrl: 'reserve-map.html',
})
export class ReserveMapPage {

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  iconColor: string ; //TO MAKE DYNAMIC WHEN NO CONNECTION


   constructor(public platform: Platform, public alertCtrl: AlertController, private network: Network,
              public maps: GoogleMapsProvider,  public modalCtrl:ModalController, public ncp: NetworkConnectionProvider) {
               
               //TEMP
    /*  */
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    console.log('network was disconnected :-(');
    this.iconColor = "red";
    console.log('network was disconnected :-( ' + this.iconColor);
    });
  
    let connectSubscription = this.network.onConnect().subscribe(() => {
    this.iconColor = "blue";
    console.log('network connected! ' + this.network.type + 'color: ' + this.iconColor);    
    // We just got a connection but we need to wait briefly
    // before we determine the connection type. Might need to wait.
    // prior to doing any api requests as well.
    setTimeout(() => {
    if (this.network.type === 'wifi') {
      console.log('we got a wifi connection, woohoo!');
    }
    }, 3000);
   });
 
  }

  ionViewWillLoad() {
        
    this.platform.ready().then(() => {
         //  console.log("Here checking connection" + this.ncp.network.type + 'Color: ' + this.ncp.iconColor);
         // this.iconColor =   this.ncp.iconColor; //"blue";
            });

          let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
         // this.mapCluster.addCluster(map);          
          });        
    }

  markerOptions(){
    console.log("marker options")
     let markerModal = this.modalCtrl.create('MapMarkerOptionsPage');
     /*
        speciesModal.onDidDismiss(dataArray => {
            this.label_en = dataArray.label_en; 
            this.binomial = dataArray.binomial;
            this.speciesImgProfile  = dataArray.imgProfile;
        });
        */
        markerModal.present();
  
  }
  
}