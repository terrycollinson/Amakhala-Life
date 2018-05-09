import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Geolocation } from '@ionic-native/geolocation';
import moment from 'moment';

@Injectable()
export class AuthData {
 
  user: any;
  userid: string;
  userName: string;
  timeago: string;
  lat: number;
  lng: number;
  acc: number;

  constructor(public afAuth: AngularFireAuth, public afDb: AngularFireDatabase, public geolocation: Geolocation) {
     this.locateUser();
            }


  locateUser(){
     let  geoOptions = {enableHighAccuracy: true}; 
     this.geolocation.getCurrentPosition(geoOptions).then((position) => { 
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.acc = position.coords.accuracy;
        // console.log(position.coords.latitude + ' : '+ position.coords.longitude)
         });
  }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail,newPassword)
  }

  resetPassword(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
  
  registerUser(name: string, email: string, password: string,phone: number): Promise<any> {

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      firebase.database().ref('/userProfile').child(newUser.uid).set({
          email: email,
          name: name,
          phone: phone,
          latitude: this.lat,
          longitude: this.lng,
          accuracy: this.acc,
      });
    });
  }

  getUserProfile(){
    this.afAuth.authState.subscribe(userAuth => {
        if(userAuth) {
          this.userid = userAuth.uid;          
          this.user = this.afDb.object('/userProfile/'+this.userid ).valueChanges();
          this.user.subscribe(profile => {
           // console.log(profile);
            this.userName = profile.name;
            this.user = profile;
            this.timeago = moment(this.user.timestamp).fromNow();
            // APPEND TO ARRAY? let this.user.timeago = this.timeago;
            return this.user;            
          })      
        } else {
          console.log('auth false');
        }

      });
  }

}
