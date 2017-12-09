import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { ListPage } from '../list/list';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  token: any;
  body: any;
  email: any;
  password: any;
  auth_token: any;
  authenticated: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public httpClient: HttpClient) {
    this.email="sandeshsatyal@gmail.com";
    this.password="sandy@123";
    this.auth_token = localStorage.getItem('auth_token');
    this.token = null;
  }
  ionViewDidLoad() {
    // if(this.auth_token != 'null' || this.auth_token != 'undefined')
    // {
    //     // console.log(this.auth_token);  
    //    this.navCtrl.setRoot(ListPage, {}, {animate: true, direction: 'forward'});
    // } 
        
  }
  
  authenticate() {
      this.httpClient.post('http://app.milifebery.co/api/authenticate',{email:this.email,password:this.password})
     .subscribe(data => {
      this.auth_token = data;
      this.authenticated = true;
      localStorage.setItem('auth_token', this.auth_token);
      console.log("user authenticated with token"+this.auth_token);
      this.navCtrl.setRoot(ListPage, {}, {animate: true, direction: 'forward'});
    },err => {
      this.showAlert('Login Error!!!','Invalid Credentials');
    }
    )
    }
    
    showAlert(title,subtitle) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['Dismiss']
      });
      alert.present();
    }

}
