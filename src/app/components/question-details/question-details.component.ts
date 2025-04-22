import { A } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  question: any;
  showAnswers: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionsService
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.questionService.getQueationById(parseInt(id)).subscribe((data)=> {
        this.question = data;
      })
    }
    
    this.showAnswers = this.router.url.includes('/answers');

    this.router.events
    .pipe(filter(event=> event instanceof NavigationEnd))
    .subscribe(()=>{
      this.showAnswers = this.router.url.includes('/answers')
    });
  }

}
