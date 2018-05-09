import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//***********  ionic-native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: string = 'IntroPage';
 // rootPage: string = 'ReserveMapPage';
  menu:Array<any> = [];
  pages: Array<any>;
 
  userid: string;
  userName: string;
  user: any;
  authState: boolean = false;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
              public afAuth: AngularFireAuth, public afDb: AngularFireDatabase) {
    this.initializeApp();

    this.afAuth.authState.subscribe(userAuth => {     
      if(userAuth) {
        this.authState = true;
        this.userid = userAuth.uid; 
        // console.log('auth true');
        this.user = this.afDb.object('/userProfile/'+this.userid ).valueChanges();
        this.user.subscribe(profile => {
         //   console.log(profile);
        this.userName = profile.name;
         })
      } else {
        console.log('auth false');
        this.authState = false;
      }
    });

    this.menu = [          

        {
          title: 'Maps',
          myicon:'',
          iconLeft: 'map',
          icon: 'ios-add-outline',
          showDetails: false,
          items:  [
              {name:'Near Me',component:'ReserveMapPage'},
              {name:'All Reserve',component:'ReserveMapPage'},
              {name:'Main Reserve',component:'ReserveMapPage'},
              {name:'Canarveon Dale',component:'ReserveMapPage'},
              {name:'Northern Territories',component:'ReserveMapPage'},
              {name:'Advanced Map Functionality',component:'GeoBackgroundPage'},
              ]
        }, 
        {
          title: 'Sightings',
          myicon:'',
          iconLeft: 'ios-eye',
          icon: 'ios-add-outline',
          showDetails: false,
          items:  [
             {name:'New Sighting',component:'SightingNewPage'},
             {name:'My Sighting',component:'MySightingPage'},
             {name:'Latest Sightings',component:'SightingLatestPage'},
             {name:'Sighting Search',component:'SightingSearchPage'},
             {name:'Sighting Detail',component:'SightingDetailPage'},
                        ]
        },{
          title: 'Wildlife',
          iconLeft: 'ios-paw',
          icon: 'ios-add-outline',
          showDetails: false,
          items:  [                
                {name:'Search',component:'WildlifeSearchPage'},
                {name:'Drill Down',component:'WildlifeTaxonomyPage'},
            ]
        },{
          title: 'Security',
          iconLeft: 'lock',
          icon: 'ios-add-outline',
          showDetails: false,
          items:  [
            {name:'Gate',component:'GatesPage'},
            {name:'Rhino',component:'RhinoPage'},
            {name:'Killing / Culling',component:'KillingPage'},
            {name:'Security',component:'SecurityPage'},
            
          ]
        },{
          title: 'Ecology',
          iconLeft: 'help-buoy',
          icon: 'ios-add-outline',
          showDetails: false,
          items:  [
            {name:'Game Count',component:'GameCountPage'},
            {name:'Injury / Removals',component:'InjuryPage'},
            {name:'Ecology',component:'EcologyPage'},
                   
          ]
        },{
          title: 'Land',
          iconLeft: 'contract',
          icon: 'ios-add-outline',
          showDetails: false,
          items:  [
            {name:'Roads',component:'RoadsPage'},
            {name:'Maintainence',component:'MaintainPage'},
            {name:'Other',component:'OtherPage'},
          ]
        },{
          title: 'People',
          iconLeft: 'people',
          icon: 'ios-add-outline',
          showDetails: false,
          items:  [
            {name:'User',component:'UserPage'},
            {name:'User Directory',component:'UserDirectoryPage'},    
            {name:'Log In',component:'LoginPage'},
            {name:'Register',component:'RegisterPage'},
            {name:'Profile',component:'AfterLoginPage'},
            {name:'Forgot Password',component:'ForgotPage'},
            {name:'Contact Us',component:'ContactFormPage'},            
          ]
        }
    ];

    this.pages = [ 
      // { icon:'call', title:'Contact us', component: 'ContactPage' },
    //  { icon:'ios-help-circle', title:'Contact Us', component: "ContactFormPage" }    
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  toggleDetails(menu) {
    if (menu.showDetails) {
        menu.showDetails = false;
        menu.icon = 'ios-add-outline';
    } else {
        menu.showDetails = true;
        menu.icon = 'ios-remove-outline';
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // page.component = item array.component --> 
    //this.nav.setRoot(page.component);
    this.nav.setRoot(page.component).catch(err => console.error(err));
  }

}
