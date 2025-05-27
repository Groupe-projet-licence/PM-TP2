import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PlanifierPageRoutingModule } from './planifier-routing.module';
import { PlanifierPage } from './planifier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanifierPageRoutingModule,
    PlanifierPage
  ],
 // declarations: [PlanifierPage]
})
export class PlanifierPageModule {}
