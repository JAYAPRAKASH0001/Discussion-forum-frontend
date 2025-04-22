import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private apiUrl = "http://localhost:3000/api/questions";

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createQuestion(question: Question): Observable<any> {
    return this.http.post(`${this.apiUrl}/new`, question);
  }

  getQueationById(id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
