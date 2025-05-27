import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FaqDetailPageRoutingModule } from './faq-detail-routing.module';
import { FaqDetailPage } from './faq-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaqDetailPageRoutingModule,
    FaqDetailPage
  ],

})
export class FaqDetailPageModule {}
