import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Survey } from '../../models/survey.model';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-surveys-list',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h2>All Surveys</h2>
  <div *ngIf="loading">Loading...</div>
  <table *ngIf="!loading && surveys.length" class="table table-striped">
    <thead>
      <tr>
        <th>ID</th><th>Name</th><th>Email</th><th>Date</th><th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let s of surveys">
        <td>{{s.id}}</td>
        <td>{{s.firstName}} {{s.lastName}}</td>
        <td>{{s.email}}</td>
        <td>{{s.dateOfSurvey}}</td>
        <td>
          <button class="btn btn-sm btn-primary me-2" (click)="edit(s.id)">Edit</button>
          <button class="btn btn-sm btn-danger" (click)="remove(s.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div *ngIf="!loading && !surveys.length" class="text-muted">No surveys yet.</div>
  `
})
export class SurveysListComponent implements OnInit {
  surveys: Survey[] = [];
  loading = true;
  constructor(private svc: SurveyService, private router: Router) {}
  ngOnInit() {
    this.svc.list().subscribe({
      next: data => { this.surveys = data; this.loading=false; },
      error: _ => { this.loading=false; }
    });
  }
  edit(id?: number) { if (id) this.router.navigate(['/survey', id]); }
  remove(id?: number) {
    if (!id) return;
    if (!confirm('Delete this survey?')) return;
    this.svc.delete(id).subscribe(() => this.ngOnInit());
  }
}
