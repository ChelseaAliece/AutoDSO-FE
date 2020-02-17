import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AutodsoComponent } from './autodso/autodso.component';
import { DevsecopsComponent } from './devsecops/devsecops.component';
import { BestPracticesComponent } from './best-practices/best-practices.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { SecurityAssessmentComponent } from './security-assessment/security-assessment.component';
import { ProfileComponent } from './manage/profile/profile.component';
import { AssessmentComponent } from './assessment/assessment.component';

import { ValidationService } from './services/validation.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ManagementComponent } from './manage/management.component';
import { AssessmentManagementComponent } from './manage/assessment-management/assessment-management.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'about', component: AutodsoComponent },
      { path: 'devsecops', component: DevsecopsComponent },
      { path: 'best-practices', component: BestPracticesComponent },
      { path: 'assessment', component: SecurityAssessmentComponent },
      {
        path: 'active-assessment',
        component: AssessmentComponent,
        canActivate: [AuthGuard]
      },
      { path: 'login', component: LoginComponent },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'manage',
        children: [
          { path: '', component: ProfileComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'assessment-management', component: AssessmentManagementComponent }
        ],
        component: ManagementComponent,
        canActivate: [AuthGuard]
      }
    ],
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

