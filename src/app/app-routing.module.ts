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
import { ManagementComponent } from './management/management.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'about', component: AutodsoComponent },
      { path: 'devsecops', component: DevsecopsComponent },
      { path: 'best-practices', component: BestPracticesComponent },
      { path: 'assessment', component: SecurityAssessmentComponent }
    ],
    component: HomeComponent
  },
  //  { path: 'assessment', component: BestPracticesComponent},
  // {
  //   path: 'manage',
  //   children: [
  //     { path: '', component: },
  //   ],
  //   component: ManagementComponent
  // },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manage', component: ManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
