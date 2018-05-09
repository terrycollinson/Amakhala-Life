import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  authState: boolean = false;

  slides = [
    {
      title: "WELCOME TO AMAKHALA LIFE",
      description: "This is an  introduction / walkthrough page for the features in this app ",
      image: "./assets/img/wildlife.jpg",
      color: "#ffffff"
    },
    {
      title: "WILDLIFE LOCKS",
      description: "Manage your locks, request approach and stand-by",
      image: "./assets/img/sightings-latest.jpg",
      color: "#ffffff"
    },
    {
      title: "WILDLIFE INFO",
      description: "Get information and photographs of wildlife found on the reserve",
      image: "./assets/img/wildlife2.jpg",
      color: "#ffffff"
    },
    {
      title: "ALERTS",
      description: "Get custom alerts on wildlife sightings or report incidents",
      image: "./assets/img/elephantheart.jpg",
      color: "#5694d1"
    }
  ];


  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {    

  }
 
  enterSite(){

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.authState = true;
        console.log('auth true');
        this.navCtrl.setRoot('UserDirectoryPage');
      } else {
        console.log('auth false');
        this.authState = false;
        this.navCtrl.setRoot('LoginPage');
      }
    });

  }
}
