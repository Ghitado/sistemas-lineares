import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatrizDoisPorDoisComponent } from './components/matriz-dois-por-dois/matriz-dois-por-dois.component';
import { MatrizTresPorTresComponent } from './components/matriz-tres-por-tres/matriz-tres-por-tres.component';

export const routes: Routes = [
  { 'path': '', component: HomeComponent },
  { 'path': 'matriz-dois-por-dois', component: MatrizDoisPorDoisComponent },
  { 'path': 'matriz-tres-por-tres', component: MatrizTresPorTresComponent },
  { 'path': '**', redirectTo: '/', pathMatch: 'full' }
];
