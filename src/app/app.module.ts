import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; //NOT SURE IF THIS IS REQUIRED
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//*********** ionic Native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { MyApp } from './app.component';

//***********  Angularfire2 v5 **************/

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';


//*********** Provider **************/
import { AuthData } from '../providers/auth-data/auth-data';
import { RadioPlayer } from '../providers/radio-service';


//*********** Image Gallery **************/
import { GalleryModal } from 'ionic-gallery-modal';
import { ZoomableImage } from 'ionic-gallery-modal';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { GoogleMapsDataProvider } from '../providers/google-maps-data/google-maps-data';
import { WildlifeServiceProvider } from '../providers/wildlife-service/wildlife-service';
import { GoogleMapsClusterProvider } from '../providers/google-maps-cluster/google-maps-cluster';
import { FirebaseDataProvider } from '../providers/firebase-data/firebase-data';
import { TrackerProvider } from '../providers/tracker/tracker';
import { NetworkConnectionProvider } from '../providers/network-connection/network-connection';


//********** firebase configuration  ************ */
export const config = { 
    apiKey: "AIzaSyDGSSvmH51cqHr24k77UM-LyW0MJcoD1f4",
    authDomain: "amakhala-16408.firebaseapp.com",
    databaseURL: "https://amakhala-16408.firebaseio.com",
    projectId: "amakhala-16408",
    storageBucket: "amakhala-16408.appspot.com",
    messagingSenderId: "1022425902248"
};
  
@NgModule({
  declarations: [
    MyApp, 
    GalleryModal,
    ZoomableImage,
    ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GalleryModal,
    ZoomableImage,
  ],
  providers: [    
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    RadioPlayer,
    Network,
    GoogleMapsProvider,
    ConnectivityServiceProvider,
    GoogleMapsDataProvider,
    WildlifeServiceProvider,
    GoogleMapsClusterProvider,
    FirebaseDataProvider,
    TrackerProvider,
    WildlifeServiceProvider,
    NetworkConnectionProvider,
    CallNumber,
  ]
})
export class AppModule {}
