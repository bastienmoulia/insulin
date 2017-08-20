import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ParametersPage } from '../parameters/parameters';
import { BloodGlucoseService } from '../../app/blood-glucose.service';
import { PhysiologicalDataService } from '../../app/physiological-data.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  glucose: number;
  insulinUnit: number;
  private glucoseTarget: number;
  hypoPower: number;
  constructor(public navCtrl: NavController, public bloodGlucoseService: BloodGlucoseService, public physiologicalDataService: PhysiologicalDataService) {
    this.glucoseTarget = 100;

    this.hypoPower = 0.35 * 60 / this.physiologicalDataService.weight / this.physiologicalDataService.k * 100;
  }

  calcul() {
    if (this.physiologicalDataService.k) {
      this.hypoPower = 0.35 * 60 / this.physiologicalDataService.weight / this.physiologicalDataService.k * 100;
    }
    if (this.physiologicalDataService.k && this.glucose) {
      if (this.glucose > this.glucoseTarget) {
        let glucoseDelta = this.glucose - this.glucoseTarget;
        this.insulinUnit = glucoseDelta / this.hypoPower;
      } else {
        this.insulinUnit = null;
      }
    } else {
      this.insulinUnit = null;
    }
  }

  goToParametersPage() {
    this.navCtrl.push(ParametersPage);
  }
}
