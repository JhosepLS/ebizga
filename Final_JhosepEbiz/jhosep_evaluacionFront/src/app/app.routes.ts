import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListaEvaluacionesComponent } from './components/evaluaciones/lista-evaluaciones/lista-evaluaciones.component';
import { CrearEvaluacionComponent } from './components/evaluaciones/crear-evaluacion/crear-evaluacion.component';
import { CompletarEvaluacionComponent } from './components/evaluaciones/completar-evaluacion/completar-evaluacion.component';
import { ListaCiclosComponent } from './components/ciclos/lista-ciclos/lista-ciclos.component';
import { CrearCicloComponent } from './components/ciclos/crear-ciclo/crear-ciclo.component';
import { ListaUsuariosComponent } from './components/usuarios/lista-usuarios/lista-usuarios.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'evaluaciones', component: ListaEvaluacionesComponent, canActivate: [authGuard] },
  { path: 'evaluaciones/crear', component: CrearEvaluacionComponent, canActivate: [authGuard] },
  { path: 'evaluaciones/:id/completar', component: CompletarEvaluacionComponent, canActivate: [authGuard] },
  { path: 'ciclos', component: ListaCiclosComponent, canActivate: [authGuard] },
  { path: 'ciclos/crear', component: CrearCicloComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: ListaUsuariosComponent, canActivate: [authGuard] }
];