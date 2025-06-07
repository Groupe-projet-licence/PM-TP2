import { Component, OnInit } from '@angular/core';
import { SkillService } from '../services/SkillService';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-skills',
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss'],
  standalone: true, // Important pour Ionic 7+
  imports: [IonicModule, CommonModule]
})
export class SkillsPage implements OnInit {
  skills: any[] = [];

  constructor(private skillService: SkillService) {}

  async ngOnInit() {
    this.skills = await this.skillService.getAllSkills();
  }
}