import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BloodGlucoseService } from '../../app/shared/blood-glucose.service';
import { PhysiologicalDataService } from '../../app/shared/physiological-data.service';

@Component({
  selector: 'page-sensitivity-coefficient',
  templateUrl: 'sensitivity-coefficient.html'
})
export class SensitivityCoefficientPage {
  method: 'simple' | 'complex' | 'reverse';
  glucoseReduction: number;
  k: number;
  weight: number;
  totalInsulin: number;
  carbohydrateDaily: number;
  hba1c: boolean;
  constructor(public navCtrl: NavController, public physiologicalDataService: PhysiologicalDataService, public bloodGlucoseService: BloodGlucoseService) {
    this.weight = physiologicalDataService.weight;
    this.method = 'simple';
  }

  calculK() {
    switch(this.method) {
      case 'simple':
        if (this.totalInsulin && this.weight) {
          let totalInsulin = this.totalInsulin;
          if (this.hba1c) {
            totalInsulin = 1.1 * totalInsulin;
          }
          this.k = Math.round((totalInsulin / (0.7 * this.weight)) * 100) / 100;
        } else {
          this.k = null;
        }
        break;
      case 'complex':
        if (this.totalInsulin && this.weight && this.carbohydrateDaily) {
          this.k = Math.round((this.totalInsulin / (0.35 * this.weight + this.carbohydrateDaily * 2.2 / 20)) * 100) / 100;
        } else {
          this.k = null;
        }
        break;
      case 'reverse':
        if (this.glucoseReduction && this.weight) {
          this.k = Math.round(0.35 * 60 / this.weight * 100 / this.bloodGlucoseService.convertToMgdl(this.glucoseReduction) * 100) / 100;
        } else {
          this.k = null;
        }
        break;
    }
  }

  saveK() {
    this.physiologicalDataService.saveK(this.k)
    this.navCtrl.pop()
  }
}
