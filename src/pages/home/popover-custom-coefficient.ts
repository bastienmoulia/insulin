import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { PhysiologicalDataService } from '../../app/shared/physiological-data.service';

@Component({
  templateUrl: 'popover-custom-coefficient.html'
})
export class PopoverCustomCoefficientPage {
  coefficient: number;
  constructor(public viewCtrl: ViewController, private physiologicalDataService: PhysiologicalDataService, private navParams: NavParams) {
  }

  ngOnInit() {
    const carbohydrateCoefficient = this.navParams.get('carbohydrateCoefficient');
    if (carbohydrateCoefficient) {
      this.coefficient = carbohydrateCoefficient;
      console.log("init", this.coefficient);
    }
  }

  close(reset?: boolean) {
    if (reset) {
      this.coefficient = null;
    }
    this.viewCtrl.dismiss(this.coefficient);
  }
}