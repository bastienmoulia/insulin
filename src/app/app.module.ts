import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ParametersPage } from '../pages/parameters/parameters';
import { PopoverCoefficientPage } from '../pages/parameters/popover-coefficient';
import { PopoverCustomCoefficientPage } from '../pages/home/popover-custom-coefficient';
import { SensitivityCoefficientPage } from '../pages/sensitivity-coefficient/sensitivity-coefficient';
import { BloodGlucoseService } from './shared/blood-glucose.service';
import { PhysiologicalDataService } from './shared/physiological-data.service';
import { ParametersService } from './shared/parameters.service';
import { InsulinUnitPipe } from './shared/insulin-unit.pipe';
import { BarchartComponent} from '../pages/parameters/barchart';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ParametersPage,
    SensitivityCoefficientPage,
    InsulinUnitPipe,
    PopoverCoefficientPage,
    PopoverCustomCoefficientPage,
    BarchartComponent
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
    SensitivityCoefficientPage,
    PopoverCoefficientPage,
    PopoverCustomCoefficientPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BloodGlucoseService,
    PhysiologicalDataService,
    ParametersService
  ]
})
export class AppModule {}
