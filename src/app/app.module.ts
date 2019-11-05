import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { HomePageComponent } from './home-page/home-page.component';
import { AutodsoComponent } from './autodso/autodso.component';
import { DevsecopsComponent } from './devsecops/devsecops.component';
import { BestPracticesComponent } from './best-practices/best-practices.component';
import { ResourcesComponent } from './resources/resources.component';
import { SecurityAssessmentComponent } from './security-assessment/security-assessment.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomePageComponent,
    AutodsoComponent,
    DevsecopsComponent,
    BestPracticesComponent,
    ResourcesComponent,
    SecurityAssessmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
