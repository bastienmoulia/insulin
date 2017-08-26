import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ParametersPage } from '../parameters/parameters';
import { BloodGlucoseService } from '../../app/shared/blood-glucose.service';
import { PhysiologicalDataService } from '../../app/shared/physiological-data.service';

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
  insulinHeal: number;
  insulinEat: number;
  insulinFat: number;
  insulinTotal: number;
  physicalActivity: number;
  physicalActivities: PhysicalActivityStep[];
  carbohydrates: number;
  more: boolean;
  fattyMeal: boolean;
  constructor(public navCtrl: NavController, public bloodGlucoseService: BloodGlucoseService, public physiologicalDataService: PhysiologicalDataService) {
    this.insulinHeal = 0;
    this.insulinEat = 0;
    this.insulinFat = 0;
    this.insulinTotal = 0;
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
      }
    ]
    this.carbohydrates = 0;
    this.more = false;
    this.fattyMeal = false;
  }

  calculHeal() {
    if (this.physiologicalDataService.hypoPower && this.glucose) {
      let glucoseInMgdl = this.bloodGlucoseService.convertToMgdl(this.glucose);
      if (glucoseInMgdl > this.bloodGlucoseService.glucoseTarget) {
        let glucoseDelta = glucoseInMgdl - this.bloodGlucoseService.glucoseTarget;
        this.insulinHeal = glucoseDelta / this.physiologicalDataService.hypoPower;
      } else {
        this.insulinHeal = 0;
      }
    } else {
      this.insulinHeal = 0;
    }
    this.calculTotal();
  }

  calculEat() {
    if (this.physiologicalDataService.k && this.carbohydrates) {
      this.physiologicalDataService.updateCarbohydrateCoefficient();
      this.insulinEat = this.carbohydrates * this.physiologicalDataService.carbohydrateCoefficient / 10;
      // this.insulinEat = this.carbohydrates / this.physiologicalDataService.portion * this.physiologicalDataService.k * 2.2;
    } else {
      this.insulinEat = 0;
    }
    this.calculFat();
  }

  calculFat() {
    if (this.fattyMeal) {
      this.insulinFat = this.carbohydrates / 50;
    } else {
      this.insulinFat = 0;
    }
    this.calculTotal();
  }

  calculTotal() {
    this.insulinTotal = this.insulinHeal + this.insulinEat + this.insulinFat;
    if (this.more) {
      this.insulinTotal = this.insulinTotal - this.insulinTotal * this.physicalActivities[this.physicalActivity].reduction / 100;
    }
  }

  goToParametersPage() {
    this.navCtrl.push(ParametersPage);
  }

  toggleMore() {
    this.more = !this.more;
  }
}
