import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { BloodGlucoseService } from '../../app/shared/blood-glucose.service';
import { PhysiologicalDataService, CarbohydrateCoefficientDetail } from '../../app/shared/physiological-data.service';
import { SensitivityCoefficientPage } from '../sensitivity-coefficient/sensitivity-coefficient';
import { ParametersService } from '../../app/shared/parameters.service';
import { PopoverCoefficientPage } from './popover-coefficient';
import { AboutPage } from "../about/about";

@Component({
  selector: 'page-parameters',
  templateUrl: 'parameters.html'
})
export class ParametersPage {
  chartData: any[];
  language: string;
  constructor(
    public navCtrl: NavController,
    public bloodGlucoseService: BloodGlucoseService,
    public physiologicalDataService: PhysiologicalDataService,
    public parametersService: ParametersService,
    public popoverCtrl: PopoverController,
    public translate: TranslateService
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
}
