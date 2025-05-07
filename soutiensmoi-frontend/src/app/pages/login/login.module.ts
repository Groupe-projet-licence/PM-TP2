import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,            // for ngModel
    IonicModule,
    RouterModule.forChild([{ path: '', component: LoginPage }]),
    LoginPage
  ],
 // declarations: [LoginPage]
})
export class LoginPageModule {}
