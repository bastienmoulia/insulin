import { Pipe, PipeTransform } from '@angular/core';
import { ParametersService } from './parameters.service';

@Pipe({name: 'insulin'})
export class InsulinUnitPipe implements PipeTransform {
  constructor(public parametersService: ParametersService) {
  }

  transform(value: number): number {
    if (this.parametersService.demiUnit) {
      return Math.round(value * 2) / 2;
    } else {
      return Math.round(value);
    }
  }
}