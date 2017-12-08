import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app:App) {
    this.logout();
  }
  
  logout()
  {
    localStorage.removeItem('auth_token');
    this.navCtrl.setRoot(LoginPage, {}, {animate: false});
  }

  ionViewDidLoad() {
    
  }

}
