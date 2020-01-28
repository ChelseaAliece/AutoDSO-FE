import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { HomePageComponent } from './home-page/home-page.component';
import { AutodsoComponent } from './autodso/autodso.component';
import { DevsecopsComponent } from './devsecops/devsecops.component';
import { BestPracticesComponent } from './best-practices/best-practices.component';
import { SecurityAssessmentComponent } from './security-assessment/security-assessment.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ManagementComponent } from './management/management.component';

import { ValidationService } from './services/validation.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomePageComponent,
    AutodsoComponent,
    DevsecopsComponent,
    BestPracticesComponent,
    SecurityAssessmentComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    ManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [
    ValidationService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
