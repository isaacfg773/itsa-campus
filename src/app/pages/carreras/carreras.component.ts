import { Component, HostListener } from '@angular/core';
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
  imagen?: string; // card
  malla?: string;  // imagen grande de malla (para el modal)
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

  // ====== MODAL ======
  modalOpen = false;
  modalSrc: string | null = null;
  modalTitle = '';

  // 9 carreras
  carreras: Carrera[] = [
    // Destacadas
    {
      slug: 'secretariado-ejecutivo',
      titulo: 'Secretariado Ejecutivo',
      desc: 'Gestión administrativa, redacción, protocolo, TIC y atención ejecutiva.',
      duracion: '3 años (6 semestres)',
      turno: 'Noche',
      imagen: 'assets/carreras/secretariado.jpg',
      malla:  'assets/mallas/secretariado.jpg'
    },
    {
      slug: 'gastronomia',
      titulo: 'Gastronomía',
      desc: 'Cocina profesional, seguridad alimentaria, pastelería y gestión de servicios.',
      duracion: '3 años (6 semestres)',
      turno: 'Mañana',
      imagen: 'assets/carreras/gastronomia.jpg',
      malla:  'assets/mallas/gastronomia.jpg'
    },
    {
      slug: 'mecanica-automotriz',
      titulo: 'Mecánica Automotriz',
      desc: 'Motores, inyección, diagnósticos, transmisiones y electricidad automotriz.',
      duracion: '3 años (6 semestres)',
      turno: 'Mañana',
      imagen: 'assets/carreras/mecanica.jpg',
      malla:  'assets/mallas/mecanica.jpg'
    },

    // Otras 6
    {
      slug: 'sistemas-informaticos',
      titulo: 'Sistemas Informáticos',
      desc: 'Desarrollo de software, redes, bases de datos y DevOps.',
      duracion: '3 años (6 semestres)',
      turno: 'Ambos',
      imagen: 'assets/carreras/sistemas.jpg',
      malla:  'assets/mallas/sistemas.jpg'
    },
    {
      slug: 'topografia-y-geodesia',
      titulo: 'Topografía y Geodesia',
      desc: 'Levantamientos, SIG, obras civiles y georreferenciación.',
      duracion: '3 años (6 semestres)',
      turno: 'Mañana',
      imagen: 'assets/carreras/topografia.jpg',
      malla:  'assets/mallas/topografia.jpg'
    },
    {
      slug: 'administracion-de-empresas',
      titulo: 'Administración de Empresas',
      desc: 'Gestión estratégica, finanzas, marketing y emprendimiento.',
      duracion: '3 años (6 semestres)',
      turno: 'Ambos',
      imagen: 'assets/carreras/administracion.jpg',
      malla:  'assets/mallas/administracion.jpg'
    },
    {
      slug: 'construccion-civil',
      titulo: 'Construcción Civil',
      desc: 'Ejecución de obras, metrados, presupuestos y seguridad.',
      duracion: '3 años (6 semestres)',
      turno: 'Noche',
      imagen: 'assets/carreras/construccion.jpg',
      malla:  'assets/mallas/construccion.jpg'
    },
    {
      slug: 'contaduria',
      titulo: 'Contaduría',
      desc: 'Contabilidad general, tributación, auditoría y costos.',
      duracion: '3 años (6 semestres)',
      turno: 'Mañana',
      imagen: 'assets/carreras/contaduria.jpg',
      malla:  'assets/mallas/contaduria.jpg'
    },
    {
      slug: 'electronica',
      titulo: 'Electrónica',
      desc: 'Circuitos, instrumentación, mantenimiento y automatización.',
      duracion: '3 años (6 semestres)',
      turno: 'Noche',
      imagen: 'assets/carreras/electronica.jpg',
      malla:  'assets/mallas/electronica.jpg'
    }
  ];

  get listaFiltrada(): Carrera[] {
    const q = this.q.trim().toLowerCase();
    return this.carreras.filter(c => {
      const matchQ = !q || (c.titulo + ' ' + c.desc).toLowerCase().includes(q);
      const matchTurno =
        this.filtroTurno === 'Todos' || c.turno === this.filtroTurno || c.turno === 'Ambos';
      return matchQ && matchTurno;
    });
  }

  setTurno(t: Turno | 'Todos') { this.filtroTurno = t; }

  // ====== MODAL actions ======
  onVerMalla(evt: Event, c: Carrera) {
    evt.preventDefault();
    evt.stopPropagation();
    this.openMalla(c);
  }

  openMalla(c: Carrera) {
    const fallback = `assets/mallas/${c.slug}.jpg`;
    this.modalSrc = c.malla || fallback;
    this.modalTitle = `Malla Curricular – ${c.titulo}`;
    this.modalOpen = true;
  }

  closeMalla() {
    this.modalOpen = false;
    this.modalSrc = null;
  }

  @HostListener('document:keydown.escape')
  onEsc() { if (this.modalOpen) this.closeMalla(); }
}
