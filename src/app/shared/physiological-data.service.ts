import { Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

interface CarbohydrateCoefficientDetail {
  coefficient: number;
  startHour: number;
}

@Injectable()
export class PhysiologicalDataService {
  /** Insulin sensitivity coefficient */
  k: number;
  weight: number;
  /** Reduction of glucose in mg/dL for 1 UI */
  hypoPower: number;
  /** Number of UI to digest 10g of carbohydrate */
  carbohydrateCoefficient: number;
  carbohydrateCoefficients: CarbohydrateCoefficientDetail[];
  hour: number;

  constructor(private storage: Storage) {
    this.carbohydrateCoefficients = [];
    this.storage.get('k').then((kFromStorage: number) => {
      console.log('Your k is', kFromStorage);
      if (kFromStorage) {
        this.k = kFromStorage;
        this.calculHypoPower();
      } else {
        // TODO go to page init physiological data
      }
    });
    this.storage.get('weight').then((weightFromStorage: number) => {
      console.log('Your weight is', weightFromStorage);
      if (weightFromStorage) {
        this.weight = weightFromStorage;
        this.calculHypoPower();
      } else {
        // TODO go to page init physiological data
      }
    });
    this.storage.get('carbohydrateCoefficients').then((carbohydrateCoefficients: CarbohydrateCoefficientDetail[]) => {
      this.updateCarbohydrateCoefficient();
      this.hour = new Date().getHours();
    });
    setInterval(() => {
      if (this.hour && this.hour !== new Date().getHours()) {
        this.updateCarbohydrateCoefficient();
      }
    }, 60 * 1000)
  }

  calculHypoPower() {
    if (this.weight && this.k) {
      this.hypoPower = 0.35 * 60 / this.weight / this.k * 100;
    } else {
      this.hypoPower = null;
    }
  }

  saveK(newK?: number) {
    if (newK) {
      this.k = newK;
    }
    console.log('Save k: ', this.k);
    this.storage.set('k', this.k);
    this.calculHypoPower();
  }

  saveWeight() {
    console.log('Save weight: ', this.weight);
    this.storage.set('weight', this.weight);
    this.calculHypoPower();
  }

  updateCarbohydrateCoefficient() {
    if (this.carbohydrateCoefficients.length > 0) {
      const hour: number = new Date().getHours();
      let newCarbohydrateCoefficient = null;
      this.carbohydrateCoefficients.forEach((carbohydrateCoefficient) => {
        if (carbohydrateCoefficient.startHour <= hour) {
          newCarbohydrateCoefficient = carbohydrateCoefficient.coefficient;
        }
      });
      if (newCarbohydrateCoefficient === null) {
        newCarbohydrateCoefficient = this.carbohydrateCoefficients[this.carbohydrateCoefficients.length - 1].coefficient;
      }
      this.carbohydrateCoefficient = newCarbohydrateCoefficient;
    } else {
      this.carbohydrateCoefficient = this.k * 1.1;
    }
  }
}