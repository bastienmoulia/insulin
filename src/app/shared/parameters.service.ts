import { Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ParametersService {
  demiUnit: boolean;

  constructor(private storage: Storage) {
    this.demiUnit = false;
    this.storage.get('demiUnit').then((demiUnitFromStorage: boolean) => {
      console.log('Your demiUnit is', demiUnitFromStorage);
      if (demiUnitFromStorage) {
        this.demiUnit = demiUnitFromStorage;
      } else {
        this.saveDemiUnit();
      }
    });
  }

  saveDemiUnit() {
    console.log('Save demiUnit: ', this.demiUnit);
    this.storage.set('demiUnit', this.demiUnit);
  }
}
