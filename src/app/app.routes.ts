import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { CarreraDetalleComponent } from './pages/carrera-detalle/carrera-detalle.component';
import { DirectoresComponent } from './pages/directores/directores.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { PanelComponent } from './pages/panel/panel.component';
import { AgenteComponent } from './pages/agente/agente.component';
import { RequisitosComponent} from './pages/requisitos/requisitos.component';

// 👇 ESTE ES EL IMPORT CORRECTO (plural en carpeta y archivo)
import { HorariosComponent } from './pages/horarios/horarios.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'oferta', component: CarrerasComponent },
  { path: 'carreras/:id', component: CarreraDetalleComponent },
  { path: 'directores', component: DirectoresComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'contacto', component: ContactoComponent },
   { path: 'panel', component: PanelComponent },
  { path: 'agente', component: AgenteComponent },
  {path: 'requisitos', component: RequisitosComponent},
  { path: 'login', component: LoginComponent },

  // 👇 NUEVA RUTA (plural)
  { path: 'horarios', component: HorariosComponent },

  { path: '**', redirectTo: '' },
];
