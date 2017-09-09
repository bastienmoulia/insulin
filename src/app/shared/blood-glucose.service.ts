import { Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

type BloodGlucoseUnit = 'mg/dL' | 'g/L' | 'mmol/L';

@Injectable()
export class BloodGlucoseService {
  unit: BloodGlucoseUnit;
  units: {
    value: BloodGlucoseUnit,
    step: number,
    min: number,
    max: number
  }[];
  /** Glucose maximal target in mg/dL */
  glucoseTargetMax: number;
  /** Glucose minimal target in mg/dL */
  glucoseTargetMin: number;
  /** Glucose  target in mg/dL */
  glucoseTarget: number;
  step: number;
  min: number;
  max: number;

  constructor(private storage: Storage) {
    this.unit = 'mg/dL';
    this.units = [
      {
        value: 'mg/dL',
        step: 1,
        min: 10,
        max: 1000
      }, {
        value: 'g/L',
        step: 0.01,
        min: 0.1,
        max: 10
      }, {
        value: 'mmol/L',
        step: 0.1,
        min: 1,
        max: 100
      }
    ];
    this.glucoseTargetMax = 120;
    this.glucoseTargetMin = 70;
    this.glucoseTarget = 100;
    this.storage.get('bloodGlucoseUnit').then((unitFromStorage: BloodGlucoseUnit) => {
      console.log('Your bloodGlucoseUnit is', unitFromStorage);
      if (this.units.findIndex((unit) => unit.value === unitFromStorage) === -1) {
        this.saveUnit();
      } else {
        this.unit = unitFromStorage;
      }
      this.selectUnitInputParameters();
    });
  }

  selectUnitInputParameters() {
    let unit = this.units.find((unit) => unit.value === this.unit);
    this.step = unit.step;
    this.min = unit.min;
    this.max = unit.max;
  }

  saveUnit() {
    console.log('Save bloodGlucoseUnit: ', this.unit);
    this.storage.set('bloodGlucoseUnit', this.unit);
    this.selectUnitInputParameters()
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
