import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/answer';
import { AnswerService } from 'src/app/services/answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit{
  answers: Answer[] = [];
  questionId!: number;
  newAnswer: any;
  constructor(private route: ActivatedRoute, private answerService: AnswerService){}

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if(id){
      this.questionId = +id;
      this.getAnswers(this.questionId);
    }
  }

  getAnswers(id: number): void {
    this.answerService.getAllAnswers(id).subscribe({
      next: (response: any) => {
        this.answers = response.answers;
      },
      error: (err: any) => {
        console.error('Error loading answers:', err);
      }
    });
  }

  createAnswer(): void {
    this.answerService.createAnswer(this.questionId, this.newAnswer).subscribe({
      next: ()=> {
        alert(`Answer Added Successfully`);
        this.getAnswers(this.questionId);
      },
      error: (err: any) => {
        console.error('Error creating answer', err);
      }
    })
  }
  
  likeAnswer(answerId: number): void {
    this.answerService.likeAnswer(answerId).subscribe({
      next: () => this.getAnswers(this.questionId),
      error: (err: any) => {
        console.error('Error liking answer:', err);
      }
    });
  }

  dislikeAnswer(answerId: number): void {
    this.answerService.dislikeAnswer(answerId).subscribe({
      next: () => this.getAnswers(this.questionId),
      error: (err: any) => {
        console.error('Error disliking answer:', err);
      }
    });
  }

  deleteAnswer(answerId: number): void {
    this.answerService.deleteAnswer(answerId).subscribe({
      next: () => this.getAnswers(this.questionId),
      error: (err: any) => {
        console.error('Error deleting answer:', err);
      }
    });
  }
}
