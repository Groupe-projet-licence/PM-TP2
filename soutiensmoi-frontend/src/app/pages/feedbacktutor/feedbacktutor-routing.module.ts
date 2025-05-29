import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbacktutorPage } from './feedbacktutor.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbacktutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbacktutorPageRoutingModule {}
