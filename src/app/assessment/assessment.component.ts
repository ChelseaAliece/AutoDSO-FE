import { Component, OnInit } from '@angular/core';
import { AssessmentMetricsEnum } from '../assessment-enums/assessment-metrics.enum';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AssessmentService } from '../services/assessment.service';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType
} from 'docx';
import { saveAs } from 'file-saver';

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

  onSubmit() {
    if (this.validationOnSubmit() === true) {
      console.log('somethings is wrong');
    } else {
      this.onAssessmentSubmit();
    }
  }

  validationOnSubmit() {
    return (
      this.testCoverage === undefined ||
      this.changeTypes === undefined ||
      this.timeAvailabilityEventInfo === undefined ||
      this.changeResolutionTime === undefined ||
      this.platformChangeFailureRate === undefined ||
      this.platformChangeVolumn === undefined ||
      this.MTTR === undefined ||
      this.totalVulnerabilityPatch === undefined ||
      this.totalMonitoringAlerts === undefined ||
      this.totalUnitInegrationTests === undefined ||
      this.totalFunctionalAcceptanceTexts === undefined ||
      this.meanRecoveryPoint === undefined ||
      this.retentionControlCompliance === undefined ||
      this.technicalControls === undefined ||
      this.vulnerabilityPatchLeadTime === undefined ||
      this.totalSarFindings === undefined ||
      this.architectureSecurityReviewTime === undefined ||
      this.totalSystemLogging === undefined ||
      this.priviledgeAuditingPercentage === undefined ||
      this.administratorCount === undefined ||
      this.onboardingLeadTime === undefined
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

    const doc = new Document();

    const header = new Paragraph({
      children: [
        new TextRun({
          text: 'High Value Metrics',
          bold: true
        })
      ]
    });

    const headerTwo = new Paragraph({
      children: [
        new TextRun({
          text:
            'These metrics provide useful information for a DevSecOps platform and should be implemented first in a new platform.'
        })
      ]
    });

    const intoParagraph = new Paragraph({
      children: [
        new TextRun({
          text:
            'This Security Metric Assessment is used to lay out the requirements that need to be met by the company’s standards. It should be used by CTO’s, CIO’s, and CISO’s to define the standard security metrics. This assessment will also be used by developers to understand and follow the standard security metrics set by the CTO’s, CIO’s, and CISO’s. This assessment will create a template that captures the requirements set by the higher authority, as well as provide documentation for the developers and auditors for easily identifying whether the requirements are being met. '
        })
      ]
    });

    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Metric Name')],
              font: 'Calibri',
              width: {
                size: 7000,
                type: WidthType.DXA
              }
            }),
            new TableCell({
              children: [new Paragraph('Description')],
              width: {
                size: 7000,
                type: WidthType.DXA
              }
            }),
            new TableCell({
              children: [new Paragraph('Metric')],
              width: {
                size: 7000,
                type: WidthType.DXA
              }
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Test Coverage')]
            }),
            new TableCell({
              children: [new Paragraph(this.assessmentEnum.TEST_COVERAGE)]
            }),
            new TableCell({
              children: [new Paragraph(this.testCoverage + '%')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Change Types')]
            }),
            new TableCell({
              children: [new Paragraph(this.assessmentEnum.CHANGE_TYPES)]
            }),
            new TableCell({
              children: [new Paragraph(this.changeTypes + '%')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph('Time to availability of event information')
              ]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.TIME_AVAILABILTY_EVENT_INFO)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.timeAvailabilityEventInfo + ' HRS')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Change resolution time')]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.CHANGE_RESOLUTION_TIME)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.changeResolutionTime + ' HRS')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('DevSecOps platform change volume')]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.PLATFORM_CHANGE_VOLUME)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.platformChangeVolumn.toString())]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph('DevSecOps platform change failure rate')
              ]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.PLATFORM_CHANGE_FAILURE_RATE)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.platformChangeFailureRate + '%')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Mean time to recovery (MTTR)')]
            }),
            new TableCell({
              children: [new Paragraph(this.assessmentEnum.MTTR)]
            }),
            new TableCell({
              children: [new Paragraph(this.MTTR + ' HRS')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Time to patch vulnerabilities')]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.TIME_VULNERABILITY_PATCH)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.timeAvailabilityEventInfo + ' HRS')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Number of monitoring alerts')]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.TOTAL_MONITORING_ALERTS)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.totalMonitoringAlerts.toString())]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Number of unit/integration tests')]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.TOTAL_UNIT_INTEGRATION_TESTS)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.totalUnitInegrationTests.toString())]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Number of functional/acceptance tests')]
            }),
            new TableCell({
              children: [
                new Paragraph(
                  this.assessmentEnum.TOTAL_FUNCTIONAL_ACCEPTANCE_TESTS
                )
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.totalFunctionalAcceptanceTexts.toString())]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Mean recovery point')]
            }),
            new TableCell({
              children: [new Paragraph(this.assessmentEnum.MEAN_RECOVERY_POINT)]
            }),
            new TableCell({
              children: [new Paragraph(this.meanRecoveryPoint + ' HRS')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Retention control compliance')]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.RETENTION_CONTROL_COMPLIANCE)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.retentionControlCompliance + '%')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Technical controls')]
            }),
            new TableCell({
              children: [new Paragraph(this.assessmentEnum.TECHNICAL_CONTROLS)]
            }),
            new TableCell({
              children: [new Paragraph(this.technicalControls.toString())]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Vulnerability patching lead time')]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.VULNERABILITY_PATCH_LEAD_TIME)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.vulnerabilityPatchLeadTime + ' HRS')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('SAR findings count')]
            }),
            new TableCell({
              children: [new Paragraph(this.assessmentEnum.TOTAL_SAR_FINDINGS)]
            }),
            new TableCell({
              children: [new Paragraph(this.totalSarFindings.toString())]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph('New architecture security review lead time')
              ]
            }),
            new TableCell({
              children: [
                new Paragraph(
                  this.assessmentEnum.ARCHITECTURE_SECURITY_REVIEW_TIME
                )
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.architectureSecurityReviewTime + ' HRS')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('System logging count')]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.TOTAL_SYSTEM_LOGGING)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.totalSystemLogging.toString())]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Privilege auditing frequency')]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.PRIVILEGE_AUDITING_PERCENTAGE)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.priviledgeAuditingPercentage.toString())]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Administrator count')]
            }),
            new TableCell({
              children: [new Paragraph(this.assessmentEnum.ADMINISTRATOR_COUNT)]
            }),
            new TableCell({
              children: [new Paragraph(this.administratorCount.toString())]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Onboarding Lead Time')]
            }),
            new TableCell({
              children: [
                new Paragraph(this.assessmentEnum.ONBOARDING_LEAD_TIME)
              ]
            }),
            new TableCell({
              children: [new Paragraph(this.onboardingLeadTime + ' HRS')]
            })
          ]
        })
      ]
    });

    doc.addSection({
      properties: {},
      children: [header, headerTwo, intoParagraph, table]
    });

    // Used to export the file into a .docx file
    Packer.toBlob(doc).then(blob => {
      // saveAs from FileSaver will download the file
      saveAs(blob, 'AutoDSOSXecurityMetrics.docx');
    });
  }
}
