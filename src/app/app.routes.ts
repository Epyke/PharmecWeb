import { Routes } from '@angular/router';
import { LoginComponent } from './login/login'; 
import { DashboardComponent } from './dashboard/dashboard';
import { EmpregadosComponent } from './empregados/empregados';
import { NovoEmpregadoComponent } from './novo-empregado/novo-empregado';
import { RelatoriosComponent } from './relatorios/relatorios';
import { GraficosVendasComponent } from './graficos-vendas/graficos-vendas';
import { roleGuard } from './guards/role-guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [roleGuard] },
  { path: 'empregados', component: EmpregadosComponent, canActivate: [roleGuard] },
  { path: 'empregados/novo', component: NovoEmpregadoComponent, canActivate: [roleGuard] },
  { path: 'empregados/editar/:id', component: NovoEmpregadoComponent, canActivate: [roleGuard] },
  { path: 'relatorios', component: RelatoriosComponent, canActivate: [roleGuard] },
  { path: 'graficos-vendas', component: GraficosVendasComponent, canActivate: [roleGuard] },

];