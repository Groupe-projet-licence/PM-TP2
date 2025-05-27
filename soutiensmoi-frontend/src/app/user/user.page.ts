import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  imports: [CommonModule,FormsModule, IonicModule ]
})
export class UserPage implements OnInit {
  user: any = null;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getToken().then(token => {
      if (token) {
        this.auth.getUser().then(u => this.user = u);
      }
    });
  }
}
