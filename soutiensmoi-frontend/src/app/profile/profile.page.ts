import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Feedback } from '../models/feedback.model';


@Component({
  selector: 'app-profile',
  standalone: true,
 imports: [CommonModule, FormsModule, IonicModule,RouterModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],

})
export class ProfilePage implements OnInit {
  tuteur: any = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getTuteur(id).subscribe((res: any) => {
      this.tuteur = res;
    });
  }

  getNoteMoyenne(): string {
  const feedbacks = this.tuteur?.feedbacks;

  if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
    return 'Aucune';
  }

  const total = feedbacks.reduce((sum: number, fb: any) => sum + (fb.note || 0), 0);
  return (total / feedbacks.length).toFixed(1);
}

getSortedFeedbacks(): Feedback[] {
  return [...(this.tuteur?.feedbacks || [])].sort((a, b) => b.note - a.note);
}
}
