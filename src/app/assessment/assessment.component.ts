import { Component, OnInit } from '@angular/core';
import { AssessmentMetricsEnum } from '../assessment-enums/assessment-metrics.enum'

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {

  assessmentEnum = AssessmentMetricsEnum;

  constructor() { }

  ngOnInit() {
  }

}
