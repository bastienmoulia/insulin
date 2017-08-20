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
  constructor(public navCtrl: NavController, public bloodGlucoseService: BloodGlucoseService, public physiologicalDataService: PhysiologicalDataService) {
  }

  calcul() {
    if (this.physiologicalDataService.hypoPower && this.glucose) {
      let glucoseInMgdl = this.bloodGlucoseService.convertToMgdl(this.glucose);
      if (glucoseInMgdl > this.bloodGlucoseService.glucoseTarget) {
        let glucoseDelta = glucoseInMgdl - this.bloodGlucoseService.glucoseTarget;
        this.insulinUnit = glucoseDelta / this.physiologicalDataService.hypoPower;
      } else {
        this.insulinUnit = 0;
      }
    } else {
      this.insulinUnit = null;
    }
  }

  goToParametersPage() {
    this.navCtrl.push(ParametersPage);
  }
}
