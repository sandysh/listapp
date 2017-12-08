import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icon: string;
  auth_token: any;
  users: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public httpClient: HttpClient) {
    this.icon = 'contact';
    this.auth_token = localStorage.getItem('auth_token');
    this.users = [];
  }
  
  ionViewDidLoad() {
        this.fetchUsers();
  }
  
  fetchUsers() {
      this.httpClient.get('http://laravel.dev/api/users',{
      headers: new HttpHeaders().set('Authorization', 'Bearer'+" "+this.auth_token),})
     .subscribe(data => {
        console.log(data);        
        this.users = data;
    },err => {
      this.showAlert('Error!!!','cannot fetch users');
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


  itemTapped(event, user) {
    this.navCtrl.push(ItemDetailsPage, {
      user: user
    });
  }
}
