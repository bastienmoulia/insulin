import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { PhysiologicalDataService, CarbohydrateCoefficientDetail } from '../../app/shared/physiological-data.service';

@Component({
  templateUrl: 'popover-coefficient.html'
})
export class PopoverCoefficientPage implements OnInit {
  carbohydrateCoefficientInit: CarbohydrateCoefficientDetail;
  startHour: string;
  coefficient: string;
  constructor(public viewCtrl: ViewController, public navParams: NavParams, public physiologicalDataService: PhysiologicalDataService, private alertCtrl: AlertController, public translate: TranslateService) {
  }

  ngOnInit() {
    const carbohydrateCoefficientParam: CarbohydrateCoefficientDetail = this.navParams.get('carbohydrateCoefficient');
    if (carbohydrateCoefficientParam) {
      this.carbohydrateCoefficientInit = carbohydrateCoefficientParam;
      this.startHour = this.hourString(carbohydrateCoefficientParam.startHour);
      this.coefficient = carbohydrateCoefficientParam.coefficient.toString();
      console.log('init', this.carbohydrateCoefficientInit, this.startHour, this.coefficient);
    }
  }

  private hourString(hour: number): string {
    let returnHour = hour.toString();
    if (returnHour.length === 1) {
      returnHour = '0' + returnHour;
    }
    returnHour += ':00'
    return returnHour;
  }

  private hourNumber(hour: string): number {
    return parseInt(hour.split(':')[0]);
  }

  testIfHourExist() {
    console.log('testIfHourExist', this.startHour, this.coefficient, this.carbohydrateCoefficientInit);
    let previousCarbohydrateCoefficient = null
    this.physiologicalDataService.carbohydrateCoefficients.forEach((carbohydrateCoefficient) => {
      if (this.hourString(carbohydrateCoefficient.startHour) === this.startHour) {
        if(!(this.carbohydrateCoefficientInit && this.carbohydrateCoefficientInit.startHour === carbohydrateCoefficient.startHour)) {
          previousCarbohydrateCoefficient = carbohydrateCoefficient;
        }
      }
    });
    console.log('previousCarbohydrateCoefficient', previousCarbohydrateCoefficient);
    if (previousCarbohydrateCoefficient !== null) {
      this.translate.get(['PARAM.CONFIRM_UPDATE_MESSAGE', 'PARAM.CONFIRM_UPDATE', 'OK', 'CANCEL'], {coefficient: previousCarbohydrateCoefficient.coefficient}).subscribe((messages) => {
        let confirm = this.alertCtrl.create({
          title: messages['PARAM.CONFIRM_UPDATE'],
          message: messages['PARAM.CONFIRM_UPDATE_MESSAGE'],
          buttons: [
            {
              text: messages['CANCEL'],
              role: 'cancel'
            },
            {
              text: messages['OK'],
              handler: () => {
                this.save(previousCarbohydrateCoefficient.startHour);
              }
            }
          ]
        });
        confirm.present();
      });
    } else {
      this.save();
    }
  }

  save(forceUpdateHour?: number) {
    const newCoefficient: CarbohydrateCoefficientDetail = {
      startHour: this.hourNumber(this.startHour),
      coefficient: parseFloat(this.coefficient)
    };
    console.log('save', forceUpdateHour);
    if (forceUpdateHour >= 0) {
      this.physiologicalDataService.carbohydrateCoefficients = this.physiologicalDataService.carbohydrateCoefficients.filter(e => e !== this.carbohydrateCoefficientInit);
    }
    if (this.carbohydrateCoefficientInit || forceUpdateHour >= 0) {
      console.log('update', this.carbohydrateCoefficientInit, newCoefficient);
      let carbohydrateCoefficientIndex = this.physiologicalDataService.carbohydrateCoefficients.findIndex((carbohydrateCoefficient) => {
        if (this.carbohydrateCoefficientInit && carbohydrateCoefficient.startHour === this.carbohydrateCoefficientInit.startHour) {
          return true;
        }
        if (carbohydrateCoefficient.startHour === forceUpdateHour) {
          return true;
        }
      });
      this.physiologicalDataService.carbohydrateCoefficients[carbohydrateCoefficientIndex] = newCoefficient;
    } else {
      console.log('add', newCoefficient);
      this.physiologicalDataService.carbohydrateCoefficients.push(newCoefficient);
    }
    console.log('carbohydrateCoefficients', this.physiologicalDataService.carbohydrateCoefficients);
    this.physiologicalDataService.saveCarbohydrateCoefficients();
    this.viewCtrl.dismiss();
  }

  delete() {
    console.log('delete', this.carbohydrateCoefficientInit);
    this.physiologicalDataService.carbohydrateCoefficients = this.physiologicalDataService.carbohydrateCoefficients.filter(e => e !== this.carbohydrateCoefficientInit);
    this.physiologicalDataService.saveCarbohydrateCoefficients();
    this.viewCtrl.dismiss();
  }
}
