import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'tutor-profile',
    loadChildren: () => import('./tutor-profile/tutor-profile.module').then( m => m.TutorProfilePageModule)
  },
  {
    path: 'feedbacktutor',
    loadChildren: () => import('./feedbacktutor/feedbacktutor.module').then( m => m.FeedbacktutorPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
