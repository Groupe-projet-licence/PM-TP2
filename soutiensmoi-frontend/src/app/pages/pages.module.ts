import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PagesPageRoutingModule } from './pages-routing.module';
import { PagesPage } from './pages.page'; // Import PagesPage

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesPageRoutingModule,
    PagesPage // Import PagesPage here
  ],
  // declarations: [PagesPage] // Remove the declaration
})
export class PagesPageModule {}
