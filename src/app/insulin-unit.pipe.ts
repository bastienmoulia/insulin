import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'insulin'})
export class InsulinUnitPipe implements PipeTransform {
  transform(value: number): number {
    if (value < 10) {
      return Math.round(value * 2) / 2;
    } else {
      return Math.round(value);
    }
  }
}