import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { CarreraDetalleComponent } from './pages/carrera-detalle/carrera-detalle.component';
import { DirectoresComponent } from './pages/directores/directores.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { AgenteComponent } from './pages/agente/agente.component';

import { NoticiasComponent } from './pages/noticias/noticias.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'oferta', component: CarrerasComponent },
  { path: 'carreras/:id', component: CarreraDetalleComponent },
 { path: 'directores', component: DirectoresComponent },             
  { path: 'noticias', component: NoticiasComponent },
  { path: 'nosotros', component: NosotrosComponent },  
  { path: 'eventos', component: EventosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
 { path: 'agente', component: AgenteComponent },       // 👈 nuevo
  { path: '**', redirectTo: '' },
];
