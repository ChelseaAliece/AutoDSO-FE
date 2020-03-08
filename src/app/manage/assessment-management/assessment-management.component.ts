import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AssessmentService } from "../../services/assessment.service";

@Component({
  selector: "app-assessment-management",
  templateUrl: "./assessment-management.component.html",
  styleUrls: ["./assessment-management.component.scss"]
})
export class AssessmentManagementComponent implements OnInit {
  assessment: object;
  user: object;

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
            console.log(err + "error");
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
}
