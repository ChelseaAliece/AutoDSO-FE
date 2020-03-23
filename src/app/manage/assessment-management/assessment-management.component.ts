import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AssessmentService } from '../../services/assessment.service';
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
import { AssessmentMetricsEnum } from '../../assessment-enums/assessment-metrics.enum';

@Component({
  selector: 'app-assessment-management',
  templateUrl: './assessment-management.component.html',
  styleUrls: ['./assessment-management.component.scss']
})
export class AssessmentManagementComponent implements OnInit {
  assessment: object;
  user: object;
  assessmentEnum = AssessmentMetricsEnum;

  constructor(
    private authService: AuthService,
    private router: Router,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(
      profile => {
        this.user = profile.user;
        this.assessmentService.getAssessment(this.user.email).subscribe(
          assessments => {
            this.assessment = assessments;
          },
          err => {
            console.log(err + 'error');
            return false;
          }
        );
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  // onAssessmentSubmit(){
  //   console.log(this.assessment[0].changeTypes)
  // }

  onAssessmentSubmit(index: number) {
    const doc = new Document();
    console.log(this.assessment[index].changeTypes);
    const header = new Paragraph({
      children: [
        new TextRun({
          text: 'High Value Metrics',
          font: 'Calibri',
          bold: true,
          spacing: {
            after: 200
          }
        })
      ]
    });

    const headerTwo = new Paragraph({
      children: [
        new TextRun({
          text:
            'These metrics provide useful information for a DevSecOps platform and should be implemented first in a new platform.',
          font: 'Arial',
          spacing: {
            before: 200
          }
        })
      ]
    });

    const intoParagraph = new Paragraph({
      children: [
        new TextRun({
          text:
            'This Security Metric Assessment is used to lay out the requirements that need to be met by the company’s standards. It should be used by CTO’s, CIO’s, and CISO’s to define the standard security metrics. This assessment will also be used by developers to understand and follow the standard security metrics set by the CTO’s, CIO’s, and CISO’s. This assessment will create a template that captures the requirements set by the higher authority, as well as provide documentation for the developers and auditors for easily identifying whether the requirements are being met. ',
          font: 'Arial',
          spacing: {
            before: 200
          }
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
              children: [
                new Paragraph(this.assessment[index].testCoverage.toString() + '%')
              ]
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
              children: [
                new Paragraph(this.assessment[index].changeTypes.toString() + '%')
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].timeAvailabilityEventInfo.toString()
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].changeResolutionTime.toString() + ' HRS'
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].platformChangeVolumn.toString()
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].platformChangeFailureRate.toString() + '%'
                )
              ]
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
              children: [new Paragraph(this.assessment[index].MTTR.toString() + ' HRS')]
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
              children: [
                new Paragraph(
                  this.assessment[index].timeAvailabilityEventInfo.toString() + ' HRS'
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].totalMonitoringAlerts.toString()
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].totalUnitInegrationTests.toString()
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[
                    index
                  ].totalFunctionalAcceptanceTexts.toString()
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].meanRecoveryPoint.toString() + ' HRS'
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].retentionControlCompliance.toString() + '%'
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].technicalControls.toString()
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].vulnerabilityPatchLeadTime.toString() + ' HRS'
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].totalSarFindings.toString()
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[
                    index
                  ].architectureSecurityReviewTime.toString() + ' HRS'
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].totalSystemLogging.toString()
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].priviledgeAuditingPercentage.toString()
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].administratorCount.toString()
                )
              ]
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
              children: [
                new Paragraph(
                  this.assessment[index].onboardingLeadTime.toString() + ' HRS'
                )
              ]
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
      saveAs(blob, 'assessment.docx');
    });
  }
}
