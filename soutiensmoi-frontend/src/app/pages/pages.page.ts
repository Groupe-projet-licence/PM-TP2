import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Import IonicModule

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
  standalone: true, // Add standalone: true
  imports: [IonicModule] // Add IonicModule to imports
})
export class PagesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
