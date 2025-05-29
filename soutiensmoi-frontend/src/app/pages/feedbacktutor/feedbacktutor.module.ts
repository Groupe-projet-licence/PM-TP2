import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbacktutorPageRoutingModule } from './feedbacktutor-routing.module';

import { FeedbacktutorPage } from './feedbacktutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbacktutorPageRoutingModule
  ],
  declarations: [FeedbacktutorPage]
})
export class FeedbacktutorPageModule {}
