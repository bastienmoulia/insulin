import { Component } from '@angular/core';
import { Platform, Config, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { InitPage } from '../pages/init/init';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  loader: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translate: TranslateService,
    config: Config,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    this.presentLoading();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      translate.setDefaultLang('en');
      let userLang = navigator.language.split('-')[0];
      userLang = /(en|fr)/gi.test(userLang) ? userLang : 'en';
      translate.use(userLang);
      translate.get('BACK').subscribe((back: string) => {
        config.set('ios','backButtonText', back)
      });

      this.storage.get('introShown').then((result) => {
        if (result) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = InitPage;
        }
        this.loader.dismiss();
        splashScreen.hide();
      });
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.loader.present();
  }
}

