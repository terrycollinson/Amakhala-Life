// https://developers.google.com/maps/documentation/utilities/polylineutility
import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ConnectivityServiceProvider } from '../connectivity-service/connectivity-service';
import { NetworkConnectionProvider } from '../network-connection/network-connection';
import { FirebaseDataProvider } from '../firebase-data/firebase-data';
import { TrackerProvider } from '../tracker/tracker';
import { Geolocation } from '@ionic-native/geolocation'; //ONLY USED IN A THEN STATEMENT
import SlidingMarker from "marker-animate-unobtrusive";


declare var google;


@Injectable()

export class GoogleMapsProvider {

  centers = {
  "BouBou": [-2.143386, 53.13060129],
  "All": [-33.540973, 26.140475],
  "Northern": [-33.51077, 26.02180],
  "CD": [-33.49001, 26.13064],
   };
   center: any = this.centers["All"];

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;  //?NOT USED
  currentMarker: any;
  apiKey: string = 'AIzaSyCrnod97v4Xs8s67ka8bQCj3dRoSuuNkDU';

  reserveLatLng: any;
  reservePath: any;

  userArray: any;
  userMarkerArray: any =[];
  userid: string;
  latitude: string;
  longitude: string;
  accuracy: number;
  timestamp: number;

  roadArray: any;
  roadsLatLng: any;
  roadsPath: any;
  roadsPathDecoded: any;
  roadDecodedLevels: any;
 
  constructor(public connectivityService: ConnectivityServiceProvider, public geolocation: Geolocation, 
              public fbd: FirebaseDataProvider, public modalCtrl:ModalController, 
              public tracker: TrackerProvider, public netcon: NetworkConnectionProvider) {
    
    
    /* DONT REALLY NEED THIS RESERVE PATH BUT REMOVING CAUSES UNEXPECTED ERROR */
    this.reserveLatLng = [
         {lat:-33.53864, lng:26.035090000000004},{lat:-33.53755, lng:26.037290000000002},{lat:-33.536280000000005, lng:26.04116},{lat:-33.53381, lng:26.04841},{lat:-33.53195, lng:26.048610000000004},{lat:-33.53009, lng:26.048070000000003},{lat:-33.52868, lng:26.046370000000003},{lat:-33.52834, lng:26.046010000000003},{lat:-33.52537, lng:26.043570000000003},{lat:-33.523900000000005, lng:26.042830000000002},{lat:-33.52004, lng:26.042320000000004},{lat:-33.51478, lng:26.04303},{lat:-33.507090000000005, lng:26.04174},{lat:-33.507090000000005, lng:26.04174},{lat:-33.501160000000006, lng:26.041120000000003},{lat:-33.49853, lng:26.041850000000004},{lat:-33.49664, lng:26.041850000000004},{lat:-33.49499, lng:26.041660000000004},{lat:-33.49907, lng:26.025990000000004},{lat:-33.51531, lng:26.030430000000003},{lat:-33.519290000000005, lng:26.03142},{lat:-33.52769, lng:26.011380000000003},{lat:-33.53031, lng:26.015110000000004},{lat:-33.531060000000004, lng:26.02193},{lat:-33.53177, lng:26.02326},{lat:-33.53678, lng:26.02691},{lat:-33.53732, lng:26.02786},{lat:-33.53757, lng:26.029190000000003},{lat:-33.53739, lng:26.037060000000004},{lat:-33.536480000000005, lng:26.037060000000004},{lat:-33.536480000000005, lng:26.037060000000004},{lat:-33.536480000000005, lng:26.036170000000002},{lat:-33.53614, lng:26.036160000000002}
          ];
    this.reservePath = new google.maps.Polyline({
            path: this.reserveLatLng,
            geodesic: true,
            strokeColor: '#00FF00',
            strokeOpacity: 1.0,
            strokeWeight: 2
         });

  }

 
  init(mapElement: any, pleaseConnect: any): Promise<any> { 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect; 
    return this.loadGoogleMaps(); 
  }

 loadGoogleMaps(): Promise<any> { 
    return new Promise((resolve) => { 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){ 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap(); 
        if(this.connectivityService.isOnline()){ 
          window['mapInit'] = () => { 
            this.initMap().then((map) => {
              resolve(map);
            }); 
            this.enableMap();
          } 
          let script = document.createElement("script");
          script.id = "googleMaps"; 
          if(this.apiKey){
            // DOES NOT WORK IN DEV script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            script.src = 'http://maps.google.com/maps/api/js?libraries=geometry&callback=mapInit';  
          } else {
            script.src = 'http://maps.google.com/maps/api/js?libraries=geometry&callback=mapInit';       
          } 
          document.body.appendChild(script);   
        } 
      }
      else { 
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        } 
      }     
    }); 
  }


  initMap(): Promise<any> {
     // CREATE MAP
    this.mapInitialised = true;
        return new Promise((resolve) => {
        let  geoOptions = {enableHighAccuracy: true}; 
         this.geolocation.getCurrentPosition(geoOptions).then((position) => { 
        // console.log(position.coords.latitude + ' : '+ position.coords.longitude)
        //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let latLng = new google.maps.LatLng(-33.53624, 26.08704);        
        let mapOptions = {
            center: latLng,
            zoom: 13, 
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            mapTypeControl: false,
            mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            streetViewControl: false ,
            fullScreen: true,
            fullscreenControl: false              
            }
        this.map = new google.maps.Map(this.mapElement, mapOptions);  

        //ADD CONTROL FOR CHANGING CENTRES - https://developers.google.com/maps/documentation/javascript/examples/control-custom#try-it-yourself
        /*
        let centerControlDiv = document.createElement('div');
        let centerControl = new CenterControl(centerControlDiv, this.map);
            centerControlDiv.index = 1;
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
       */
        // CONSIDER THIS FOR MAPPING TO NEAREST ROAD
        // https://stackoverflow.com/questions/16429562/find-a-point-in-a-polyline-which-is-closest-to-a-latlng
       
        //START OF USER MARKERS
        this.fbd.users.subscribe(userDetails => { 

        //First get rid of historical positions
        while(this.userMarkerArray.length) { this.userMarkerArray.pop().setMap(null); }
        this.userMarkerArray = []; 
     
        // Then build new array of markers
        this.userArray = userDetails;
        // console.log(userDetails);
        let infoWindow = new google.maps.InfoWindow();
       
        for (var i = 0; i < this.userArray.length; i++) { 
            let user = this.userArray[i];   
            let arrayID = i;
            let userName =  this.userArray[i].name;
            let userID =  this.userArray[i].key;
            let latitude = this.userArray[i].latitude;
            let longitude = this.userArray[i].longitude;
            let latitudep = this.userArray[i].latitudep;
            let longitudep = this.userArray[i].longitudep;
           // console.log(latitudep)
            let positionnew = new google.maps.LatLng(latitude, longitude);
            let positionold = new google.maps.LatLng(latitudep, longitudep);
            let iconName = 'http://maps.google.com/mapfiles/kml/pal4/icon62.png';
       
            let marker = new SlidingMarker({
                map: this.map,
                draggable:true,
                label:{ text: userName, color: 'yellow', labelAnchor: new google.maps.Point(18, 12), },
                position: positionold,
                icon: iconName
                });                    
            marker.setDuration(5000);
            marker.setEasing('linear');
            marker.setPosition(positionnew);
            this.userMarkerArray.push(marker);

         // Open the InfoWindow on mouseover: CONFLICTS WITH CLICK
        /*
          google.maps.event.addListener(marker, 'mouseover', function(e) {
          //roadPathLine.setOptions({strokeColor: "#00FF00", strokeWeight: 5, strokeOpacity: 1});
              infoWindow.setPosition(e.latLng);
              infoWindow.setContent("<b>" + userName + "</b><br>Road Length:" + userName + " m<br>At: " + e.latLng );
              infoWindow.open(this.map);
               });
        */
        google.maps.event.addListener(marker, 'click',(event) =>{
        //console.log(user)
        let pageDetails = this.modalCtrl.create('UserPage', {user}); //TO DO LOCATION OVERVIEW
        pageDetails.present();
        });
      
        google.maps.event.addListener(marker, 'dragend',(m) => {
           this.accuracy = 5;
           this.timestamp = Date.now();
           this.fbd.updateUserProfileAllLatLng();
           this.fbd.updateUserProfileLatLng(userID, m.latLng.lat().toFixed(6), m.latLng.lng().toFixed(6), this.timestamp, 5, latitude, longitude, this.timestamp );
        });
       
        }                
      });
      // END OF USER MARKERS
          
      // START OF ROADS
          this.fbd.roads.subscribe(roadDetails => {

          let infoWindow = new google.maps.InfoWindow();
          this.roadArray = roadDetails;

          for (var i = 0; i < this.roadArray.length; i++) { 
              let path = google.maps.geometry.encoding.decodePath(this.roadArray[i].en_polyline); 
              let roadName = this.roadArray[i].road_name;
              let roadLength = Math.round(google.maps.geometry.spherical.computeLength(path));
              
              // Create roads
              let roadPathLine = new google.maps.Polyline({
               path: path,
               levels: this.roadArray[i].en_levels,
               strokeColor: "#00FF00",
               strokeOpacity: 0,
               strokeWeight: 10
                }); 
               roadPathLine.setMap(this.map);

              // Open the InfoWindow on mouseover: 
              google.maps.event.addListener(roadPathLine, 'mouseover', function(e) {
              roadPathLine.setOptions({strokeColor: "#00FF00", strokeWeight: 5, strokeOpacity: 1});
              infoWindow.setPosition(e.latLng);
              infoWindow.setContent("<b>" + roadName + "</b><br>Road Length:" + roadLength + " m<br>You are at: " + e.latLng );
              infoWindow.open(this.map);
               });

              // Close the InfoWindow on mouseout:
              google.maps.event.addListener(roadPathLine, 'mouseout', function() {
              roadPathLine.setOptions({strokeColor: "#00FF00", strokeWeight: 10, strokeOpacity: 0});
              setTimeout(function(){infoWindow.close()}, '1000');
              });
            
              // Open the RoadEdit Window on double click: TO DO
              google.maps.event.addListener(roadPathLine, 'dblclick', function() {
              let pageDetails = this.modalCtrl.create('VehiclePage');
                  pageDetails.present();
              });
          }         
        }); 
        // END OF ROADS       
        resolve(this.map); 
      }); 
    }); 
  }


 //NOT USED - NEVER SEEN LEVELS CODED JUST SEEN BBBBB..
  decodeLevels(encodedLevelsString) {
    let decodedLevels = [];
    for (var i = 0; i < encodedLevelsString.length; ++i) {
        var level = encodedLevelsString.charCodeAt(i) - 63;
        decodedLevels.push(level);
    }
    return decodedLevels;
  }


  disableMap(): void { 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    } 
  }
 
  enableMap(): void { 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    } 
  }

   // Sets the map on all markers in the array.
  setMapOnAll(map) {
    for (var i = 0; i < this.userMarkerArray.length; i++) {
          this.userMarkerArray[i].setMap(map);
        }
  }

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers() {
     this.setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  showMarkers() {
    this.setMapOnAll(this.map);
  }

  // Deletes all markers in the array by removing references to them.
  deleteMarkers() {
    this.clearMarkers();
    this.userMarkerArray = [];
  }

  //Reserve Map Marker Options

      toggleReserveMap(e){
         if (e.checked == false){
           console.log(e);
          // this.reserveMap.setMap(null);
            }
        else {
        // this.reserveMap.setMap(this.map);
        console.log(e); 
           }
      
    }

    //ADD CONTROL TO SWITCH MAPS
    /*
    CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        let controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        let controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Center Map';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
          map.setCenter(this.center);
        });

      }
    */

}

