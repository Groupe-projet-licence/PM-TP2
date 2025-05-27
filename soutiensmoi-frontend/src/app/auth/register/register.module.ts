import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // nécessaire pour ngModel
import { IonicModule } from '@ionic/angular'; // nécessaire pour tous les composants ion-*


import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
     RegisterPage
  ],

})
export class RegisterPageModule {}
