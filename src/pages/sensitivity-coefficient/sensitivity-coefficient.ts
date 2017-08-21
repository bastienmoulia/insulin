import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BloodGlucoseService } from '../../app/shared/blood-glucose.service';
import { PhysiologicalDataService } from '../../app/shared/physiological-data.service';

@Component({
  selector: 'page-sensitivity-coefficient',
  templateUrl: 'sensitivity-coefficient.html'
})
export class SensitivityCoefficientPage {
  glucoseReduction: number;
  k: number;
  weight: number;
  constructor(public navCtrl: NavController, public physiologicalDataService: PhysiologicalDataService, public bloodGlucoseService: BloodGlucoseService) {
    this.weight = physiologicalDataService.weight;
  }

  calculK() {
    if (this.glucoseReduction && this.weight) {
      this.k = Math.round(0.35 * 60 / this.weight * 100 / this.bloodGlucoseService.convertToMgdl(this.glucoseReduction) * 100) / 100;
    } else {
      this.k = null;
    }
  }

  saveK() {
    this.physiologicalDataService.saveK(this.k)
    this.navCtrl.pop()
  }
}
