import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { LoginPage } from '../login/login';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public httpClient: HttpClient, private splashScreen: SplashScreen) {
    this.email="";
    this.password="";
    this.auth_token = '';
  }
  ionViewDidLoad() {
    this.auth_token = localStorage.getItem('auth_token');
    if(this.auth_token != null)
    {
        this.splashScreen.show();
        this.navCtrl.setRoot(ListPage, {}, {animate: true, direction: 'forward'});
        this.splashScreen.hide();
    } 
  }
  
  authenticate() {
      this.httpClient.post('http://laravel.dev/api/authenticate',{email:this.email,password:this.password})
     .subscribe(data => {
      this.auth_token = data.token;
      this.authenticated = true;
      localStorage.setItem('auth_token', this.auth_token);
      console.log("user authenticated with token"+this.auth_token);
      this.navCtrl.setRoot(ListPage, {}, {animate: true, direction: 'forward'});
    },err => {
      this.showAlert('Login Error!!!','Invalid Credentials');
    })
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
