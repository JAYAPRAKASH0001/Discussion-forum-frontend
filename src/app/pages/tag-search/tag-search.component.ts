import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.css']
})
export class TagSearchComponent {
  tag: string = '';
  questions: any[] = [];
  lastSearchedTag: string = '';
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const paramTag = params['tag'];
      if (paramTag) {
        this.tag = paramTag;
        this.lastSearchedTag = paramTag;
        this.fetchQuestionsByTag(this.tag);
      } else {
        this.questions = [];
        this.notFound = false;
      }
    });
  }

  fetchQuestionsByTag(tag: string) {
    this.questionService.getQuestionByTag(tag).subscribe({
      next: (res) => {
        this.questions = res;
        this.notFound = res.length === 0;
      },
      error: () => {
        this.questions = [];
        this.notFound = true;
      }
    });
  }

  onSearchSubmit() {
    const trimmed = this.tag.trim();
    if (trimmed) {
      this.router.navigate(['/tags', trimmed]);
    }
  }
}
