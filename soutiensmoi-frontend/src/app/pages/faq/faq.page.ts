import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../services/faq.service';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  standalone: true, // Make sure this is true
  imports: [IonicModule, FormsModule, CommonModule] // Add IonicModule and FormsModule to imports
})
export class FaqPage implements OnInit {
  faqs: any[] = [];

  constructor(private faqService: FaqService) {}

  ngOnInit() {
    this.faqService.getFaqs().subscribe({
      next: (res) => this.faqs = res,
      error: (err) => console.error('Erreur FAQ :', err)
    });
  }
}
