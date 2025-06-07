import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'acceuil',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'acceuil',
    loadComponent: () => import('./pages/acceuil/acceuil.page').then(m => m.AcceuilPage)
  },
  {
    path: 'skills',
    loadComponent: () => import('./skills/skills.page').then(m => m.SkillsPage)
  },
];
