import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Request, RequestMethod, Headers } from "@angular/http";
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

// https://medium.com/@markgoho/create-a-contact-form-in-angular-using-cloud-functions-for-firebase-5e390bdf5600

@IonicPage()
@Component({
  selector: 'page-contact-form',
  templateUrl: 'contact-form.html',
})
export class ContactFormPage {

  // http: Http;
  mailgunUrl: string;
  mailgunApiKey: string;
  item: Observable<any>;

  //https://www.thepolyglotdeveloper.com/2016/05/send-emails-ionic-2-mobile-app-via-rackspace-mailgun-api/

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public db: AngularFireDatabase) {
        this.http = http;
        //this.mailgunUrl = "https://api.mailgun.net/v3/mg.amakhala.life";
        this.mailgunUrl = "mg.amakhala.life";
        this.mailgunApiKey = window.btoa("key-2s9o2pd07nm2q3mxu46pnqd9rnxqzc88");

        this.item = db.object('userProfile/JLmB19kwonZpyhbk67RmSFJIu4c2').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactFormPage');
  }

  send(recipient: string, subject: string, message: string) {
        var requestHeaders = new Headers();
        requestHeaders.append("Authorization", "Basic " + this.mailgunApiKey);
        requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
            body: "from=terry@amakhala.life&to=" + recipient + "&subject=" + subject + "&text=" + message,
            headers: requestHeaders
        }))
        .subscribe(success => {
            console.log("SUCCESS -> " + JSON.stringify(success));
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

    test(recipient: string, subject: string, message: string) {
      const itemRef = this.db.object('userProfile/JLmB19kwonZpyhbk67RmSFJIu4c2');
      itemRef.update({ role: subject });
    }

}
