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
      { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage',
        children: [
          { path: '', component: ProfileComponent },
          { path: 'profile', component: ProfileComponent }
          // { path: "assessment-managment", component: ManagementComponent }
        ],
        component: ManagementComponent,
        canActivate: [AuthGuard]
      }
    ],
    component: HomeComponent
  }
  //  { path: 'assessment', component: BestPracticesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// {
//   path: '',
//   children: [
//     { path: '', component: HomeComponent },
//     { path: 'temp', component: TempComponent },
//     { path: 'temp2', component: TempComponent2 },
//    ]
//   component: HomeComponent
// },
// { path: 'logout', component: LogoutComponent },
// { path: '**', redirectTo: '' }
