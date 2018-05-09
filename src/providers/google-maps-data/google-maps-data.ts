import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';
declare var google;
 
@Injectable()
export class GoogleMapsDataProvider {

    map:any
    
    //Sightings
    markerCluster: any;
    locations: any;

    //Reserve Map
    innerCoords: any;
    outerCoords: any;
    reserveMap: any;   
    showReserveMap: boolean;
    
    
    constructor(public http: Http) {
          
        this.locations = [
          {lng: 26.051674, lat: -33.512774, label_en: 'Addax'},
          {lng: 26.049271, lat: -33.513061, label_en: 'Elephant'},
          {lng: 26.041718, lat: -33.513919, label_en: 'Addax'},
          {lng: 26.032104, lat: -33.482999, label_en: 'Lion'},
          {lng: 25.998116, lat: -33.499892, label_en: 'Addax'},
          {lng: 26.036224, lat: -33.539105, label_en: 'Addax'},
          {lng: 26.078453, lat: -33.567717, label_en: 'Hyena'},
          {lng: 26.173210, lat: -33.547690, label_en: 'Addax'},
          {lng: 26.164284, lat: -33.505904, label_en: 'Addax'},
          {lng: 26.136475, lat: -33.500751, label_en: 'Bat'},
          {lng: 26.130638, lat: -33.505045, label_en: 'Addax'},
          {lng: 26.119652, lat: -33.502755, label_en: 'Addax'},
          {lng: 26.123772, lat: -33.490730, label_en: 'Addax'},
          {lng: 26.053391, lat: -33.512488, label_en: 'Cheetah'}  
            ]; 

        this.innerCoords = [
          {lng: 26.051674, lat: -33.512774},
          {lng: 26.049271, lat: -33.513061},
          {lng: 26.041718, lat: -33.513919},
          {lng: 26.032104, lat: -33.482999},
          {lng: 25.998116, lat: -33.499892},
          {lng: 26.036224, lat: -33.539105},
          {lng: 26.078453, lat: -33.567717},
          {lng: 26.173210, lat: -33.547690},
          {lng: 26.164284, lat: -33.505904},
          {lng: 26.136475, lat: -33.500751},
          {lng: 26.130638, lat: -33.505045},
          {lng: 26.119652, lat: -33.502755},
          {lng: 26.123772, lat: -33.490730},
          {lng: 26.053391, lat: -33.512488}  
            ];  

        this.outerCoords = [
          {lng: 25.557947, lat: -30},
          {lng: 26.529858, lat: -30},
          {lng: 26.529858, lat: -34},
          {lng: 25.557947, lat: -34}
        ];  
        }
 
    addCluster(map){
 
        if(google.maps){

            let infoWin = new google.maps.InfoWindow(
                {
                    maxWidth: 300
                }
            );
 
            //Convert locations into array of markers for sightings
            let markers = this.locations.map((location) => {
               
                var marker = new google.maps.Marker({
                position: location,
                label: {text: location.label_en, color: 'yellow' }
                //TO DO icon: 'assets/images/marker.png' + http://map-icons.com/
                   });
            console.log('Markers Array');
            console.log(markers);
                 google.maps.event.addListener(marker, 'click', function(evt) {
                 infoWin.setContent("<h3>" + location.label_en + "</h3>" +
                 "<img src=http://placehold.it/300>"    +
                 "Date<br>" +
                 "Time<br>" +
                 "Comments<br>" +
                 "Spotter Name"        
                 );
                 infoWin.open(map, marker);
                 })
                return marker;
                }); 

             this.markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/map/m'});

        
         this.reserveMap = new google.maps.Polygon({
          paths: [this.outerCoords, this.innerCoords],
          strokeColor: '#FFFFFF',
          strokeOpacity: 0.5,
          strokeWeight: 1,
          fillColor: '#222',
          fillOpacity: 0.3
        }); 
        this.map = map; //To allow toggling of markers
         
        } else {
            console.warn('Google maps needs to be loaded before adding sightings');
        }
 
    }

    addInfoWindow(marker, content) {
      let infoWindow = new google.maps.InfoWindow({
          content: content
      });
      google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
           });
     }
       
     toggleReserveMap(e){
         if (e.checked == false){
          this.reserveMap.setMap(null);
            }
        else {
        this.reserveMap.setMap(this.map); 
           }
      
    }
 
}