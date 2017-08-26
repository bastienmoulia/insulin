import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { BloodGlucoseService } from '../../app/shared/blood-glucose.service';
import { PhysiologicalDataService, CarbohydrateCoefficientDetail } from '../../app/shared/physiological-data.service';
import { SensitivityCoefficientPage } from '../sensitivity-coefficient/sensitivity-coefficient';
import { ParametersService } from '../../app/shared/parameters.service';
import { PopoverCoefficientPage } from './popover-coefficient';

@Component({
  selector: 'page-parameters',
  templateUrl: 'parameters.html'
})
export class ParametersPage {
  constructor(
    public navCtrl: NavController,
    public bloodGlucoseService: BloodGlucoseService,
    public physiologicalDataService: PhysiologicalDataService,
    public parametersService: ParametersService,
    public popoverCtrl: PopoverController
  ) {
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
  }
}
