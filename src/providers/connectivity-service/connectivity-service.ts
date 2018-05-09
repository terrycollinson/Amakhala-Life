import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
 
declare var Connection;
 
@Injectable()
export class ConnectivityServiceProvider {
 
  onDevice: boolean;
  Connection: any;
 
  constructor(public platform: Platform, public network: Network){
    this.onDevice = this.platform.is('cordova');
  }
 
  isOnline(): boolean {
    if(this.onDevice && this.network.type){
      return this.network.type !== Connection.NONE;
    } else {
      return navigator.onLine; 
    }
  }
 
  isOffline(): boolean {
    if(this.onDevice && this.network.type){
      return this.network.type === Connection.NONE;
    } else {
      return !navigator.onLine;   
    }
  }
  
  /*  */
  watchOnline() {
   let connectSubscription = this.network.onConnect().subscribe(() => {
  console.log('network connected!');
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
 
 watchOffline() {
  let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            console.log('network was disconnected :-(');
          });
 }
 /*
  watchOffline(): Observable<any> {
  //  return Network.onDisconnect(); NEED TO CHECK THIS OUT
  }
 */
}


