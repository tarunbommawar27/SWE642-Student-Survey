import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey.model';

@Injectable({ providedIn: 'root' })
export class SurveyService {
  private base = 'http://localhost:8080/api/surveys';
  constructor(private http: HttpClient) {}
  list(): Observable<Survey[]> { return this.http.get<Survey[]>(this.base); }
  get(id: number): Observable<Survey> { return this.http.get<Survey>(`${this.base}/${id}`); }
  create(s: Survey): Observable<Survey> { return this.http.post<Survey>(this.base, s); }
  update(id: number, s: Survey): Observable<Survey> { return this.http.put<Survey>(`${this.base}/${id}`, s); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}
