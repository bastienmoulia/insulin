import { Component } from '@angular/core';

import { BloodGlucoseService } from '../../app/blood-glucose.service';
import { PhysiologicalDataService } from '../../app/physiological-data.service';

@Component({
  selector: 'page-parameters',
  templateUrl: 'parameters.html'
})
export class ParametersPage {
  constructor(public bloodGlucoseService: BloodGlucoseService, public physiologicalDataService: PhysiologicalDataService) {
  }
}
