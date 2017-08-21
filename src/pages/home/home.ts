import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ParametersPage } from '../parameters/parameters';
import { BloodGlucoseService } from '../../app/blood-glucose.service';
import { PhysiologicalDataService } from '../../app/physiological-data.service';

interface PhysicalActivityStep {
  value: number;
  label: string;
  reduction: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  glucose: number;
  insulinUnit: number;
  physicalActivity: number;
  physicalActivities: PhysicalActivityStep[]
  constructor(public navCtrl: NavController, public bloodGlucoseService: BloodGlucoseService, public physiologicalDataService: PhysiologicalDataService) {
    this.physicalActivity = 0;
    this.physicalActivities = [
      {
        value: 0,
        label: 'none',
        reduction: 0
      }, {
        value: 1,
        label: 'light',
        reduction: 20
      }, {
        value: 2,
        label: 'medium',
        reduction: 35
      }, {
        value: 3,
        label: 'intense',
        reduction: 50
      }, 
    ]
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
      this.insulinUnit = this.insulinUnit - this.insulinUnit * this.physicalActivities[this.physicalActivity].reduction / 100;
    } else {
      this.insulinUnit = null;
    }
  }

  goToParametersPage() {
    this.navCtrl.push(ParametersPage);
  }
}
