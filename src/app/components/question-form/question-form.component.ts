import { Component, Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { QuestionsService } from 'src/app/services/questions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent {
  question = {
    title: '',
    description: '',
    tags: [] as string[]
  };

  constructor(private questionService: QuestionsService, private router: Router){}

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if(value) {
      this.question.tags.push(value);
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.question.tags.indexOf(tag);
    if(index>=0) {
      this.question.tags.splice(index, 1);
    }
  }

  submitForm(): void{
    this.questionService.createQuestion(this.question).subscribe({
      next: () => {
        alert('Question submitted successfully!');
        this.router.navigate(['/questions']);
      },
      error: (err) => {
        console.error('Failed to submit question', err);
        alert('Error occurred. Please try again.');
      }
    });
  }
}