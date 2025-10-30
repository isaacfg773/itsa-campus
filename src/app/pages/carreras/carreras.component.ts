import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type Turno = 'Mañana' | 'Noche' | 'Ambos';

interface Carrera {
  slug: string;
  titulo: string;
  desc: string;
  duracion: string;
  turno: Turno;
  sede?: string;
  imagen?: string; // ruta pública (usaremos /public)
}

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent {
  // búsqueda y filtros
  q = '';
  filtroTurno: Turno | 'Todos' = 'Todos';

  carreras: Carrera[] = [
    {
      slug: 'administracion-de-empresas',
      titulo: 'Administración de Empresas',
      desc: 'Gestión estratégica, finanzas, marketing y emprendimiento.',
      duracion: '3 años (6 semestres)',
      turno: 'Ambos',
      imagen: '/carreras/adm.jpg'
    },
    {
      slug: 'topografia-y-geodesia',
      titulo: 'Topografía y Geodesia',
      desc: 'Levantamientos, SIG, obras civiles y georreferenciación.',
      duracion: '3 años (6 semestres)',
      turno: 'Mañana',
      imagen: '/carreras/topografia.jpg'
    },
    {
      slug: 'sistemas-informaticos',
      titulo: 'Sistemas Informáticos',
      desc: 'Desarrollo de software, redes, bases de datos y DevOps.',
      duracion: '3 años (6 semestres)',
      turno: 'Ambos',
      imagen: '/carreras/sistemas.jpg'
    },
    {
      slug: 'construccion-civil',
      titulo: 'Construcción Civil',
      desc: 'Ejecución de obras, metrados, presupuestos y seguridad.',
      duracion: '3 años (6 semestres)',
      turno: 'Noche',
      imagen: '/carreras/construccion.jpg'
    },
    {
      slug: 'contaduria',
      titulo: 'Contaduría',
      desc: 'Contabilidad general, tributación, auditoría y costos.',
      duracion: '3 años (6 semestres)',
      turno: 'Mañana',
      imagen: '/carreras/contaduria.jpg'
    },
    {
      slug: 'electronica',
      titulo: 'Electrónica',
      desc: 'Circuitos, instrumentación, mantenimiento y automatización.',
      duracion: '3 años (6 semestres)',
      turno: 'Noche',
      imagen: '/carreras/electronica.jpg'
    },
  ];

  get listaFiltrada(): Carrera[] {
    const q = this.q.trim().toLowerCase();
    return this.carreras.filter(c => {
      const matchQ = !q || (c.titulo + ' ' + c.desc).toLowerCase().includes(q);
      const matchTurno = this.filtroTurno === 'Todos' || c.turno === this.filtroTurno || c.turno === 'Ambos';
      return matchQ && matchTurno;
    });
  }

  setTurno(t: Turno | 'Todos') { this.filtroTurno = t; }
}
