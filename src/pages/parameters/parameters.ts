import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BloodGlucoseService } from '../../app/blood-glucose.service';
import { PhysiologicalDataService } from '../../app/physiological-data.service';
import { SensitivityCoefficientPage } from '../sensitivity-coefficient/sensitivity-coefficient';

@Component({
  selector: 'page-parameters',
  templateUrl: 'parameters.html'
})
export class ParametersPage {
  constructor(public navCtrl: NavController, public bloodGlucoseService: BloodGlucoseService, public physiologicalDataService: PhysiologicalDataService) {
  }

  goToSensitivityCoefficientPage() {
    this.navCtrl.push(SensitivityCoefficientPage);
  }
}
