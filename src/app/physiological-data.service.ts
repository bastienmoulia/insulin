import { Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class PhysiologicalDataService {
  k: number;
  weight: number;

  constructor(private storage: Storage) {
    this.k = 1.7;
    this.weight = 77;
    this.storage.get('k').then((kFromStorage: number) => {
      console.log('Your k is', kFromStorage);
      if (kFromStorage) {
        this.k = kFromStorage;
      } else {
        // TODO go to page init physiological data
      }
    });
    this.storage.get('weight').then((weightFromStorage: number) => {
      console.log('Your weight is', weightFromStorage);
      if (weightFromStorage) {
        this.weight = weightFromStorage;
      } else {
        // TODO go to page init physiological data
      }
    });
  }

  saveK() {
    console.log('Save k: ', this.k);
    this.storage.set('k', this.k);
  }

  saveWeight() {
    console.log('Save weight: ', this.weight);
    this.storage.set('weight', this.weight);
  }
}