import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FaqNewPageRoutingModule } from './faq-new-routing.module';
import { FaqNewPage } from './faq-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaqNewPageRoutingModule,
    FaqNewPage
  ],

})
export class FaqNewPageModule {}
