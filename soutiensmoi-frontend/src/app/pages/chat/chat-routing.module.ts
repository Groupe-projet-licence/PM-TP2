const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule) },
];