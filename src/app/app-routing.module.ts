import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  { path: 'survey/:id/:email', component: SurveyComponent },
  {
    path: '**',
    redirectTo: 'survey/62c3302056e62c001284644e/vikasgarg284@gmail.com',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
