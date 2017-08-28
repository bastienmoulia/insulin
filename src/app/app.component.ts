import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, translate: TranslateService, config: Config) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      translate.setDefaultLang('en');
      let userLang = navigator.language.split('-')[0];
      userLang = /(en|fr)/gi.test(userLang) ? userLang : 'en';
      translate.use(userLang);
      translate.get('BACK').subscribe((back: string) => {
        config.set('ios','backButtonText', back)
      });
    });
  }
}

