import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.model';

const LIKED_OPTIONS = ['students','location','campus','atmosphere','dorm rooms','sports'];

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <h2>{{ id ? 'Edit Survey' : 'Student Survey' }}</h2>
  <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
    <div class="row">
      <div class="col-md-6 mb-2">
        <label>First Name*</label>
        <input class="form-control" formControlName="firstName">
      </div>
      <div class="col-md-6 mb-2">
        <label>Last Name*</label>
        <input class="form-control" formControlName="lastName">
      </div>
    </div>
    <label>Street Address*</label>
    <input class="form-control mb-2" formControlName="streetAddress">
    <div class="row">
      <div class="col-md-4 mb-2"><label>City*</label><input class="form-control" formControlName="city"></div>
      <div class="col-md-4 mb-2"><label>State*</label><input class="form-control" formControlName="state"></div>
      <div class="col-md-4 mb-2"><label>Zip*</label><input class="form-control" formControlName="zip"></div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-2"><label>Telephone*</label><input class="form-control" formControlName="telephone"></div>
      <div class="col-md-6 mb-2"><label>Email*</label><input class="form-control" formControlName="email"></div>
    </div>
    <div class="mb-2">
      <label>Date of Survey*</label>
      <input class="form-control" type="date" formControlName="dateOfSurvey">
    </div>
    <fieldset class="mb-2">
      <legend class="h6">What did you like most? (checkboxes)</legend>
      <div class="form-check form-check-inline" *ngFor="let opt of likedOptions">
        <input class="form-check-input" type="checkbox"
               [checked]="isChecked(opt)" (change)="onToggleLiked(opt, $event)" [id]="opt">
        <label class="form-check-label" [for]="opt">{{opt}}</label>
      </div>
    </fieldset>
    <div class="mb-2">
      <label class="me-3">How did you become interested? (radio)</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="FRIENDS" formControlName="interestSource" id="friends">
        <label class="form-check-label" for="friends">Friends</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="TELEVISION" formControlName="interestSource" id="tv">
        <label class="form-check-label" for="tv">Television</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="INTERNET" formControlName="interestSource" id="internet">
        <label class="form-check-label" for="internet">Internet</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="OTHER" formControlName="interestSource" id="other">
        <label class="form-check-label" for="other">Other</label>
      </div>
    </div>
    <div class="mb-2">
      <label>Likelihood to recommend (dropdown)</label>
      <select class="form-select" formControlName="recommendLikelihood">
        <option value="VERY_LIKELY">Very Likely</option>
        <option value="LIKELY">Likely</option>
        <option value="UNLIKELY">Unlikely</option>
      </select>
    </div>
    <div class="mb-3">
      <label>Additional comments</label>
      <textarea class="form-control" rows="3" formControlName="comments"></textarea>
    </div>
    <button class="btn btn-success me-2" type="submit">Submit</button>
    <button class="btn btn-secondary" type="button" (click)="cancel()">Cancel</button>
  </form>
  `
})
export class SurveyFormComponent implements OnInit {
  id?: number;
  likedOptions = LIKED_OPTIONS;
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    streetAddress: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    telephone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    dateOfSurvey: ['', Validators.required],
    likedMost: this.fb.array([]),
    interestSource: ['INTERNET', Validators.required],
    recommendLikelihood: ['VERY_LIKELY', Validators.required],
    comments: ['']
  });
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private svc: SurveyService
  ) {}
  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : undefined;
    if (this.id) {
      this.svc.get(this.id).subscribe(s => {
        this.form.patchValue({...s, dateOfSurvey: s.dateOfSurvey});
        const arr = this.form.get('likedMost') as FormArray;
        arr.clear();
        (s.likedMost || []).forEach(v => arr.push(this.fb.control(v)));
      });
    }
  }
  onToggleLiked(opt: string, e: Event) {
    const input = e.target as HTMLInputElement;
    const arr = this.form.get('likedMost') as FormArray;
    const idx = arr.value.indexOf(opt);
    if (input.checked && idx === -1) arr.push(this.fb.control(opt));
    if (!input.checked && idx > -1) arr.removeAt(idx);
  }
  isChecked(opt: string) {
    const arr = this.form.get('likedMost') as FormArray;
    return arr.value.includes(opt);
  }
  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload: Survey = this.form.value as any;
    const call = this.id ? this.svc.update(this.id, payload) : this.svc.create(payload);
    call.subscribe(() => this.router.navigate(['/surveys']));
  }
  cancel() { this.router.navigate(['/']); }
}
