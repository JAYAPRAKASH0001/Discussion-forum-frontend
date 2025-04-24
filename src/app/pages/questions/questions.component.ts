import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit{
  questions: any[] = [];
  totalQuestions: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  filter: string = 'newest';
  keyword: string = '';
  notFound: boolean = false;
  isSearchMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filter = params['filter'] || 'newest';
      this.currentPage = +params['page'] || 1;
      this.pageSize = +params['limit'] || 10;
      this.keyword = params['search'] || '';
      this.isSearchMode = !!this.keyword;

      if (this.isSearchMode) {
        this.fetchQuestionByKeyword(this.keyword);
      } 
      else {
      this.fetchQuestions();
      }
    });
  }

  fetchQuestions() {
    this.questionsService
      .getAllQuestions(this.filter, this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {
          this.questions = res.data;
          this.totalQuestions = res.pagination.totalQuestions;
          this.notFound = res.data.length === 0;
        },
        error: ()=> {
          this.questions = [];
          this.notFound = true;
        }
      });
  }

  fetchQuestionByKeyword(keyword: string) {
    this.questionsService.searchQuestions(keyword).subscribe({
      next: (res) => {
        this.questions = res.data;
        this.totalQuestions = res.pagination?.totalQuestions || res.data.length || 0;
        this.notFound = res.data.length === 0;
      },
      error: ()=> {
        this.questions = [];
        this.notFound = true;
      }
    })
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;

    this.updateQueryParams({ page: this.currentPage, limit: this.pageSize });
  }

  changeSort(filter: string) {
    this.filter = filter;
    this.currentPage = 1;

    this.updateQueryParams({ filter: this.filter, page: 1 });
  }

  onSearchSubmit() {
    const trimmed = this.keyword.trim();
    if(trimmed) {
      this.updateQueryParams({ search: trimmed, page: 1, filter: null });
      this.fetchQuestionByKeyword(trimmed);
    }
  }

  clearSearch() {
    this.keyword = '';
    this.updateQueryParams({ search: null, filter: 'newest', page: 1 });
  }  

  private updateQueryParams(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }
}
