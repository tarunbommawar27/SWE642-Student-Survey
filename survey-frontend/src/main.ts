import 'zone.js'; // <<< REQUIRED for Angular change detection
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes, RouterOutlet, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './app/pages/home/home.component';
import { SurveyFormComponent } from './app/pages/survey-form/survey-form.component';
import { SurveysListComponent } from './app/pages/surveys-list/surveys-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <div class="container">
    <h1 class="mt-2 mb-3">SWE 642 - Student Survey</h1>
    <nav class="mb-3">
      <a class="btn btn-primary me-2" routerLink="/survey">Student Survey</a>
      <a class="btn btn-outline-secondary" routerLink="/surveys">List All Surveys</a>
    </nav>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'survey', component: SurveyFormComponent },
  { path: 'survey/:id', component: SurveyFormComponent },
  { path: 'surveys', component: SurveysListComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [ provideHttpClient(), provideRouter(routes) ]
}).catch(err => console.error(err));
