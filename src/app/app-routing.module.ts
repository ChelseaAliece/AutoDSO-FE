import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AutodsoComponent } from './autodso/autodso.component';
import { DevsecopsComponent } from './devsecops/devsecops.component';
import { BestPracticesComponent } from './best-practices/best-practices.component';
import { ResourcesComponent } from './resources/resources.component';
import { LoginComponent } from './authentication/login/login.component';


const routes: Routes = [
 { path: '', component: HomePageComponent},
 { path: 'home', component: HomePageComponent},
 { path: 'about', component: AutodsoComponent},
 { path: 'devsecops', component: DevsecopsComponent},
 { path: 'best-practices', component: BestPracticesComponent},
 { path: 'resources', component: ResourcesComponent},
//  { path: 'assessment', component: BestPracticesComponent},
  { path: 'login', component: LoginComponent},
//  { path: 'manage', component: ResourcesComponent},
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
