import { Routes } from '@angular/router';
import { LoginComponent } from './login/login'; 
import { DashboardComponent } from './dashboard/dashboard';
import { EmpregadosComponent } from './empregados/empregados';
import { NovoEmpregadoComponent } from './novo-empregado/novo-empregado';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'empregados', component: EmpregadosComponent },
  { path: 'empregados/novo', component: NovoEmpregadoComponent }

];