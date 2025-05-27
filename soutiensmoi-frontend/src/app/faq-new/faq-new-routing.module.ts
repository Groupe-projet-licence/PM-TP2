import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqNewPage } from './faq-new.page';

const routes: Routes = [
  {
    path: '',
    component: FaqNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqNewPageRoutingModule {}
