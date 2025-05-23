import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private apiUrl;

  constructor(private http: HttpClient, private apiOb: ApiConfigService) {
    this.apiUrl = apiOb.getBaseUrl() + "/questions";
  }

  getAllQuestions(filter?: string, page?: number, limit?: number): Observable<any> {
    let queryParams = [];

    if(page !== undefined) queryParams.push(`page=${page}`);
    if(limit !== undefined) queryParams.push(`limit=${limit}`);
    if(filter) queryParams.push(`filter=${filter}`);
    
    const queryString = queryParams.length? '?'+queryParams.join('&') : ''; 
    return this.http.get<any>(`${this.apiUrl}${queryString}`);
  }
  
  createQuestion(question: Question): Observable<any> {
    return this.http.post(`${this.apiUrl}/new`, question);
  }

  getQueationById(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getQuestionByTag(tag: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/tag/${tag}`);
  }

  searchQuestions(keyword: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/search?q=${keyword}`);
  }
}
