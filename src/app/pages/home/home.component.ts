import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  questions: Question[] = [];

  constructor(private questionService: QuestionsService){}

  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe((response)=>{
      this.questions = response.data;
    })
  }
}
