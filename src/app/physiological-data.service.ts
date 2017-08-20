import { Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class PhysiologicalDataService {
  k: number;
  weight: number;
  /** reduction of glucose in mg/dL for 1 UI */
  hypoPower: number;

  constructor(private storage: Storage) {
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
}