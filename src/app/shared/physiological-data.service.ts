import { Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

export interface CarbohydrateCoefficientDetail {
  coefficient: number;
  startHour: number;
}

@Injectable()
export class PhysiologicalDataService {
  /** Insulin sensitivity coefficient */
  k: number;
  weight: number;
  /** Reduction of glucose in mg/dL for 1 IU */
  hypoPower: number;
  /** Number of IU to digest 10g of carbohydrate */
  carbohydrateCoefficient: number;
  carbohydrateCoefficients: CarbohydrateCoefficientDetail[];
  hour: number;
  loading: boolean;

  constructor(private storage: Storage) {
    this.loading = true;
    this.storage.get('k').then((kFromStorage: number) => {
      console.log('Your k is', kFromStorage);
      if (kFromStorage) {
        this.k = kFromStorage;
        this.calculHypoPower();
      } else {
        this.loading = false;
      }
    });
    this.storage.get('weight').then((weightFromStorage: number) => {
      console.log('Your weight is', weightFromStorage);
      if (weightFromStorage) {
        this.weight = weightFromStorage;
        this.calculHypoPower();
      } else {
        this.loading = false;
      }
    });
    this.storage.get('carbohydrateCoefficients').then((carbohydrateCoefficientsFromStorage: CarbohydrateCoefficientDetail[]) => {
      console.log('Your carbohydrateCoefficients are', carbohydrateCoefficientsFromStorage);
      this.carbohydrateCoefficients = carbohydrateCoefficientsFromStorage;
      this.updateCarbohydrateCoefficient();
      this.hour = new Date().getHours();
    }, () => {
      this.updateCarbohydrateCoefficient();
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
    this.loading = false;
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

  saveCarbohydrateCoefficients() {
    this.carbohydrateCoefficients.sort((a, b) => {
      if (a.startHour < b.startHour) {
        return -1;
      } else {
        return 1;
      }
    })
    console.log('Save carbohydrateCoefficients: ', this.carbohydrateCoefficients);
    this.storage.set('carbohydrateCoefficients', this.carbohydrateCoefficients);
    this.updateCarbohydrateCoefficient();
  }

  updateCarbohydrateCoefficient() {
    if (!this.carbohydrateCoefficients || this.carbohydrateCoefficients.length === 0) {
      this.carbohydrateCoefficients = [{
        startHour: 2,
        coefficient: 2
      }, {
        startHour: 11,
        coefficient: 1
      }, {
        startHour: 18,
        coefficient: 1.5
      }];
      this.saveCarbohydrateCoefficients();
    }
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
  }
}
