import { Component, OnInit } from '@angular/core';
import { AssessmentMetricsEnum } from '../assessment-enums/assessment-metrics.enum';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AssessmentService } from '../services/assessment.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  assessmentEnum = AssessmentMetricsEnum;
  assessment: object;
  user: object;
  createdBy: string;
  testCoverage: number;
  changeTypes: number;
  timeAvailabilityEventInfo: number;
  changeResolutionTime: number;
  platformChangeVolumn: number;
  platformChangeFailureRate: number;
  MTTR: number;
  totalVulnerabilityPatch: number;
  totalMonitoringAlerts: number;
  totalUnitInegrationTests: number;
  totalFunctionalAcceptanceTexts: number;
  meanRecoveryPoint: number;
  retentionControlCompliance: number;
  technicalControls: number;
  vulnerabilityPatchLeadTime: number;
  totalSarFindings: number;
  architectureSecurityReviewTime: number;
  totalSystemLogging: number;
  priviledgeAuditingPercentage: number;
  administratorCount: number;
  onboardingLeadTime: number;

  constructor(
    private assessmentService: AssessmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(
      profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  onAssessmentSubmit() {
    const assessment = {
      createdBy: this.user.email,
      testCoverage: this.testCoverage,
      changeTypes: this.changeTypes,
      timeAvailabilityEventInfo: this.timeAvailabilityEventInfo,
      changeResolutionTime: this.changeResolutionTime,
      platformChangeVolumn: this.platformChangeVolumn,
      platformChangeFailureRate: this.platformChangeFailureRate,
      MTTR: this.MTTR,
      totalVulnerabilityPatch: this.totalVulnerabilityPatch,
      totalMonitoringAlerts: this.totalMonitoringAlerts,
      totalUnitInegrationTests: this.totalUnitInegrationTests,
      totalFunctionalAcceptanceTexts: this.totalFunctionalAcceptanceTexts,
      meanRecoveryPoint: this.meanRecoveryPoint,
      retentionControlCompliance: this.retentionControlCompliance,
      technicalControls: this.technicalControls,
      vulnerabilityPatchLeadTime: this.vulnerabilityPatchLeadTime,
      totalSarFindings: this.totalSarFindings,
      architectureSecurityReviewTime: this.architectureSecurityReviewTime,
      totalSystemLogging: this.totalSystemLogging,
      priviledgeAuditingPercentage: this.priviledgeAuditingPercentage,
      administratorCount: this.administratorCount,
      onboardingLeadTime: this.onboardingLeadTime
    };
    this.assessmentService.newAssessment(assessment).subscribe(data => {
      if ((data as any).success) {
        console.log('assessment created');
        this.router.navigate(['/manage/assessment-management']);
      } else {
        console.log('assessment failed');
      }
    });
  }
}
