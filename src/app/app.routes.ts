import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { EventListComponent } from './components/event-list/event-list';
import { EventDetailComponent } from './components/event-detail/event-detail';
import { RegisterComponent } from './components/register/register';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'register/:id', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
