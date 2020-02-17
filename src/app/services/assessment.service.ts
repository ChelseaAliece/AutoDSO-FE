import { Injectable } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  assessment: any;
  createdBy: any;

  constructor(private http: HttpClient) {}

  newAssessment(assessment) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/assessments/create-assessment', assessment, { headers })
      .pipe(map(res => res));
  }

  getAssessment() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      createdBy: this.createdBy
    });
    return this.http
      .get('http://localhost:3000/assessments/view-assessment', { headers })
      .pipe(map(res => res));
  }
}
