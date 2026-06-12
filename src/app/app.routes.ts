import { Routes } from '@angular/router';
import { LoginComponent } from './login/login'; 
import { DashboardComponent } from './dashboard/dashboard';
import { EmpregadosComponent } from './empregados/empregados';
import { NovoEmpregadoComponent } from './novo-empregado/novo-empregado';
import { RelatoriosComponent } from './relatorios/relatorios';
import { GraficosVendasComponent } from './graficos-vendas/graficos-vendas';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'empregados', component: EmpregadosComponent },
  { path: 'empregados/novo', component: NovoEmpregadoComponent },
  { path: 'empregados/editar/:id', component: NovoEmpregadoComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'graficos-vendas', component: GraficosVendasComponent }

];