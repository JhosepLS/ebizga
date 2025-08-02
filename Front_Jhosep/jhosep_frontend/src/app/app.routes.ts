import { Routes } from '@angular/router';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { CrearLibroComponent } from './crear-libro/crear-libro.component';
import { ListarLibrosComponent } from './listar-libros/listar-libros.component';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';

export const routes: Routes = [
    { path: '', redirectTo: 'listar-libros', pathMatch: 'full' },
    { path: 'crear-usuarios', component: CrearUsuariosComponent },
    { path: 'crear-libro', component: CrearLibroComponent },
    { path: 'listar-libros', component: ListarLibrosComponent },
    { path: 'crear-reserva', component: CrearReservaComponent }
];