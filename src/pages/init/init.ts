import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from "../home/home";
import { PhysiologicalDataService, CarbohydrateCoefficientDetail } from '../../app/shared/physiological-data.service';
import { BloodGlucoseService } from '../../app/shared/blood-glucose.service';
import { SensitivityCoefficientPage } from '../sensitivity-coefficient/sensitivity-coefficient';
import { ChartItem } from "../barchart/barchart";
import { PopoverCoefficientPage } from '../parameters/popover-coefficient';

@Component({
  selector: 'page-init',
  templateUrl: 'init.html'
})

export class InitPage {
  @ViewChild(Slides) slides: Slides;
  chartData: ChartItem[];
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public physiologicalDataService: PhysiologicalDataService,
    public bloodGlucoseService: BloodGlucoseService,
    public popoverCtrl: PopoverController
  ) {
  }

  ngAfterViewInit() {
    console.log("Slides", this.slides)
    this.slides.lockSwipeToNext(true);
  }

  next() {
    if (this.slides.getActiveIndex() === 3) {
      this.generateChartData();
    }
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
  }

  goToHome(){
    this.storage.set('introShown', true);
    this.navCtrl.setRoot(HomePage);
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
}
