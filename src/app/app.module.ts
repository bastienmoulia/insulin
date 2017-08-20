import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ParametersPage } from '../pages/parameters/parameters';
import { SensitivityCoefficientPage } from '../pages/sensitivity-coefficient/sensitivity-coefficient';
import { BloodGlucoseService } from './blood-glucose.service';
import { PhysiologicalDataService } from './physiological-data.service';
import { InsulinUnitPipe } from './insulin-unit.pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ParametersPage,
    SensitivityCoefficientPage,
    InsulinUnitPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ParametersPage,
    SensitivityCoefficientPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BloodGlucoseService,
    PhysiologicalDataService
  ]
})
export class AppModule {}
