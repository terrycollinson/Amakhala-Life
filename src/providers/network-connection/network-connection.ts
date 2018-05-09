import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';


@Injectable()
export class NetworkConnectionProvider {

  iconColor: string;

  constructor(public network: Network, public http: Http) {

  //  console.log('Hello Network Connection Provider Provider');

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    console.log('network was disconnected :-(');
    this.iconColor = "red";
    console.log('network was disconnected :-(' + this.iconColor);
    });
  
    let connectSubscription = this.network.onConnect().subscribe(() => {
    this.iconColor = "blue";
    // console.log('network connected!' + this.network.type + 'color: ' + this.iconColor);    
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

}
