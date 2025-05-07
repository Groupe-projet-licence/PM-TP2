import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true, // Make sure this is true
  imports: [IonicModule, FormsModule, CommonModule] // Add IonicModule and FormsModule to imports
})
export class SearchPage {
  subject: string = '';
  level: string = '';
  tutors: any[] = [];

  constructor(private searchService: SearchService) {}

  doSearch(): void {
    this.searchService.search(this.subject, this.level).subscribe({
      next: (data: any[]) => {
        this.tutors = data;
        console.log('Résultats trouvés :', data);
      },
      error: (err) => {
        console.error('Erreur lors de la recherche', err);
      }
    });
  }
}


