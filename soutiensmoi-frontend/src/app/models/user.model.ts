import { Skill } from './skill.model';
import { Feedback } from './feedback.model';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'etudiant' | 'tuteur' | 'admin';
  avatar?: string;
  bio?: string;
  skills?: Skill[];
  feedbacks?: Feedback[];
}
