import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private apiUrl;

  constructor(private http: HttpClient, private apiOb: ApiConfigService) { 
    this.apiUrl = apiOb.getBaseUrl();
  }

  getAllAnswers(questionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/questions/${questionId}/answers`);
  }

  createAnswer(questionId: number, answer_text: string): Observable<any> {
    return this.http.post( `${this.apiUrl}/questions/${questionId}/answers`, {answer_text});
  }

  likeAnswer(answerId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/answers/${answerId}/like`,{});
  }

  dislikeAnswer(answerId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/answers/${answerId}/dislike`,{});
  }

  deleteAnswer(answerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/answers/${answerId}`);
  }
}
