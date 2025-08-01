import { Routes } from '@angular/router';
import { Aulas } from './aulas/aulas';
import { estudiantes } from './estudiantes/estudiantes';

export const routes: Routes = [
    {path: 'aulas', component:Aulas},
    {path: 'estudiantes', component:estudiantes}
];
