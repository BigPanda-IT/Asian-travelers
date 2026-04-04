import { Routes } from '@angular/router';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const routes: Routes = [
  { path: 'post/:id', component: PostDetailComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];