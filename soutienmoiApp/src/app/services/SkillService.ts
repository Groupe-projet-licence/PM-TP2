// src/app/services/skill.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = 'http://localhost:8000/api'; // Adaptez l'URL

  async getAllSkills() {
    const response = await axios.get(`${this.apiUrl}/skills`);
    return response.data;
    }
}