import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Categoria = 'Académico' | 'Convenios' | 'Taller' | 'Feria' | 'Cultural' | 'Deportivo';

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fechaISO: string;       // '2025-11-15'
  lugar: string;
  categoria: Categoria;
  imagen: string;         // assets/eventos/...
  enlace?: string;        // link externo (opcional)
  galeria?: string[];     // ids/urls de fotos
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent {
  // ====== Data (puedes reemplazar por tu API después) ======
  private _eventos = signal<Evento[]>([
  {
    id: 1,
    titulo: 'Admisión 2025 – Lanzamiento',
    descripcion: 'Presentación oficial de cronograma, requisitos y modalidades de ingreso.',
    fechaISO: '2025-11-05',
    lugar: 'Sede Central Sacaba',
    categoria: 'Académico',
    imagen: 'assets/eventos/admision2025-1.jpg',
    galeria: ['assets/eventos/admision2025.jpg','assets/eventos/afiche.jpg']
  },
  {
    id: 2,
    titulo: 'Convocatoria Admisión 2025',
    descripcion: 'Publicación de la convocatoria y registro de postulantes.',
    fechaISO: '2025-11-10',
    lugar: 'Dirección Académica',
    categoria: 'Académico',
    imagen: 'assets/eventos/admision2025.jpg'
  },
  {
    id: 3,
    titulo: 'Afiche Oficial – Agenda ITSA',
    descripcion: 'Difusión de actividades institucionales del mes.',
    fechaISO: '2025-11-15',
    lugar: 'Comunicación ITSA',
    categoria: 'Cultural',
    imagen: 'assets/eventos/afiche.jpg'
  },
  {
    id: 4,
    titulo: 'Visita del Sr. Gobernador',
    descripcion: 'Reunión institucional para fortalecer alianzas y proyectos educativos.',
    fechaISO: '2025-11-20',
    lugar: 'Rectorado',
    categoria: 'Convenios',
    imagen: 'assets/eventos/gobernador.jpg'
  },
  {
    id: 5,
    titulo: 'FIPAB – Participación ITSA',
    descripcion: 'Feria de innovación y productividad con proyectos destacados.',
    fechaISO: '2025-11-28',
    lugar: 'Recinto Ferial',
    categoria: 'Feria',
    imagen: 'assets/eventos/fipab.jpg',
    galeria: ['assets/eventos/evento1.jpg']
  },
  {
    id: 6,
    titulo: 'Evento Especial',
    descripcion: 'Cobertura fotográfica de actividades recientes.',
    fechaISO: '2025-12-05',
    lugar: 'Patio Central',
    categoria: 'Cultural',
    imagen: 'assets/eventos/evento1.jpg'
  }
]);


  categorias: Categoria[] = ['Académico','Convenios','Taller','Feria','Cultural','Deportivo'];

  // ====== Filtros ======
  q = signal<string>('');
  cat = signal<Categoria | 'Todos'>('Todos');
  mes = signal<number | 'Todos'>('Todos');   // 1..12
  anio = signal<number | 'Todos'>('Todos');  // ej. 2025

  // ====== Paginación ======
  page = signal<number>(1);
  pageSize = signal<number>(6);

  // Años disponibles (derivado del dataset)
  aniosDisponibles = computed(() => {
    const set = new Set<number>();
    for (const e of this._eventos()) set.add(new Date(e.fechaISO).getFullYear());
    return Array.from(set).sort();
  });

  // Próximos (siguientes 3 desde hoy)
  proximos = computed(() => {
    const now = new Date();
    return this._eventos()
      .filter(e => new Date(e.fechaISO) >= new Date(now.toDateString()))
      .sort((a,b) => +new Date(a.fechaISO) - +new Date(b.fechaISO))
      .slice(0, 3);
  });

  // Lista filtrada
  filtrados = computed(() => {
    const text = this.q().trim().toLowerCase();
    const cat = this.cat();
    const m = this.mes();
    const y = this.anio();

    return this._eventos().filter(e => {
      const d = new Date(e.fechaISO);
      const okText =
        !text ||
        e.titulo.toLowerCase().includes(text) ||
        e.descripcion.toLowerCase().includes(text) ||
        e.lugar.toLowerCase().includes(text);

      const okCat = cat === 'Todos' ? true : e.categoria === cat;
      const okMes = m === 'Todos' ? true : (d.getMonth() + 1) === m;
      const okAnio = y === 'Todos' ? true : d.getFullYear() === y;

      return okText && okCat && okMes && okAnio;
    }).sort((a,b) => +new Date(a.fechaISO) - +new Date(b.fechaISO));
  });

  // Página actual (slice)
  paginados = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.filtrados().slice(start, start + this.pageSize());
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filtrados().length / this.pageSize()))
  );

  // Helpers UI
  resetPage() { this.page.set(1); }
  setCat(c: Categoria | 'Todos') { this.cat.set(c); this.resetPage(); }
  setMes(m: number | 'Todos') { this.mes.set(m); this.resetPage(); }
  setAnio(y: number | 'Todos') { this.anio.set(y); this.resetPage(); }

  monthLabel(n: number) {
    return ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][n-1];
  }

  // Modal muy simple para galería (opcional)
  modalOpen = signal<boolean>(false);
  modalImgs = signal<string[]>([]);
  openGaleria(imgs?: string[]) {
    if (!imgs || !imgs.length) return;
    this.modalImgs.set(imgs);
    this.modalOpen.set(true);
  }
  closeModal(){ this.modalOpen.set(false); }
}
