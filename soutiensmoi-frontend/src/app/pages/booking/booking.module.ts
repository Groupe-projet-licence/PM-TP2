import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BookingPage } from './booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: BookingPage }]),
    BookingPage // Import the standalone component here
  ],
  // declarations: [BookingPage] // Remove the declaration
})
export class BookingPageModule {}
