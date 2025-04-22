import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { AnswerComponent } from './components/answer/answer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questions/new', component: QuestionFormComponent },
  {
    path: 'questions/:id',
    component: QuestionDetailsComponent,
    children: [
      { path: 'answers', component: AnswerComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
