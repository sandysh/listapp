import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>;
  auth_token: any;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    console.log("i am always running");
    this.auth_token = localStorage.getItem('auth_token');
    this.initializeApp();


    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'Logout', component: LogoutPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
        if(this.auth_token == null || this.auth_token == undefined || this.auth_token == 'null' || this.auth_token == 'undefined' || this.auth_token == '' )
        {
            this.rootPage = LoginPage;
        } else {
            this.rootPage = ListPage;
        }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
