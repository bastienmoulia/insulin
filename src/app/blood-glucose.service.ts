import { Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

type BloodGlucoseUnit = "mg/dL" | "g/L" | "mmol/L";

@Injectable()
export class BloodGlucoseService {
  unit: BloodGlucoseUnit;
  units: BloodGlucoseUnit[];
  glucoseTarget: number;

  constructor(private storage: Storage) {
    this.unit = 'mg/dL';
    this.units = ['mg/dL', 'g/L', 'mmol/L'];
    this.glucoseTarget = 120;
    this.storage.get('bloodGlucoseUnit').then((unitFromStorage: BloodGlucoseUnit) => {
      console.log('Your bloodGlucoseUnit is', unitFromStorage);
      if (this.units.indexOf(unitFromStorage) === -1) {
        this.saveUnit();
      } else {
        this.unit = unitFromStorage;
      }
    });
  }

  saveUnit() {
    console.log('Save bloodGlucoseUnit: ', this.unit);
    this.storage.set('bloodGlucoseUnit', this.unit);
  }

  convertFromMgdl(value: number) {
    return this.convert(value, 'mg/dL', this.unit);
  }

  convertToMgdl(value: number) {
    return this.convert(value, this.unit, 'mg/dL');
  }

  convert(value: number, from: BloodGlucoseUnit, to: BloodGlucoseUnit): number {
    if (from === to) {
      return value;
    } else {
      switch(from) {
        case('g/L'):
          value *= 100;
          break;
        case('mmol/L'):
          value *= 18;
          break;
      }
      switch(to) {
        case('g/L'):
          value /= 100;
          break;
        case('mmol/L'):
          value /= 18;
          break;
      }
      return value;
    }
  }
}