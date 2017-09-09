import { Component } from '@angular/core';
import { NavController, PopoverController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { BloodGlucoseService } from '../../app/shared/blood-glucose.service';
import { PhysiologicalDataService, CarbohydrateCoefficientDetail } from '../../app/shared/physiological-data.service';
import { SensitivityCoefficientPage } from '../sensitivity-coefficient/sensitivity-coefficient';
import { ParametersService } from '../../app/shared/parameters.service';
import { PopoverCoefficientPage } from './popover-coefficient';
import { AboutPage } from '../about/about';
import { InitPage } from '../init/init';
import { ChartItem } from '../barchart/barchart';

@Component({
  selector: 'page-parameters',
  templateUrl: 'parameters.html'
})
export class ParametersPage {
  chartData: ChartItem[];
  language: string;
  constructor(
    public navCtrl: NavController,
    public bloodGlucoseService: BloodGlucoseService,
    public physiologicalDataService: PhysiologicalDataService,
    public parametersService: ParametersService,
    public popoverCtrl: PopoverController,
    public translate: TranslateService,
    private storage: Storage,
    public alertCtrl: AlertController
  ) {
    this.language = translate.currentLang;
    setTimeout(() => {
      this.generateChartData();
    }, 100);
  }

  goToSensitivityCoefficientPage() {
    this.navCtrl.push(SensitivityCoefficientPage);
  }

  openPopover(e: Event, carbohydrateCoefficient?: CarbohydrateCoefficientDetail) {
    const data = {carbohydrateCoefficient: carbohydrateCoefficient};
    let popover = this.popoverCtrl.create(PopoverCoefficientPage, data);
    popover.present({
      ev: e
    });
    popover.onWillDismiss(() => {
      this.generateChartData();
    })
  }

  generateChartData() {
    if (this.physiologicalDataService.carbohydrateCoefficients) {
      this.chartData = [];
      for (let i = 0; i < 24; i++) {
        let coefficient = this.physiologicalDataService.carbohydrateCoefficients[this.physiologicalDataService.carbohydrateCoefficients.length - 1].coefficient;
        this.physiologicalDataService.carbohydrateCoefficients.forEach((coefDetail) => {
          if (i >= coefDetail.startHour) {
            coefficient = coefDetail.coefficient;
          }
        });
        this.chartData.push([
          new Date(2000, 0, 1, i),
          coefficient
        ]);
      }
    }
  }

  changeLanguage() {
    this.translate.use(this.language);
  }

  goToAboutPage() {
    this.navCtrl.push(AboutPage);
  }

  goToInitPage() {
    this.translate.get(['OK', 'CANCEL']).subscribe((messages) => {
      console.log('trad', messages);
      let confirm = this.alertCtrl.create({
        title: 'Supprimer les paramètres ? A TRAD',
        message: 'L\'initialisation de l\'application supprimera tout vos paramètres A TRAD',
        buttons: [
          {
            text: messages['CANCEL']
          },
          {
            text: messages['OK'],
            handler: () => {
              this.storage.set('introShown', false);
              this.navCtrl.push(InitPage);
            }
          }
        ]
      });
      confirm.present();
    });
  }
}
