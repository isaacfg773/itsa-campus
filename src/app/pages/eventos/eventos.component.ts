import { Component } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Categoria =
  | 'Admisiones'
  | 'Ferias'
  | 'Talleres'
  | 'Convenios'
  | 'Académico'
  | 'Autoridades';

interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: Categoria;
  fechaISO: string;     // 'YYYY-MM-DD'
  lugar: string;
  imagen: string;       // ruta a assets
  enlace?: string;      // opcional
  galeria?: string[];   // opcional
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf, DatePipe],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent {

  /* =========================
     1) DATA (editar libremente)
  ========================== */
  eventos: Evento[] = [
    {
      id: 'admision-2025',
      titulo: 'Inscripciones Gestión 2025',
      descripcion:
        'Apertura oficial de inscripciones para la Gestión 2025. Conoce requisitos, fechas y beneficios.',
      categoria: 'Admisiones',
      fechaISO: '2025-01-10',
      lugar: 'ITSA – Secretaría Académica',
      imagen: 'assets/eventos/admision2025.png',
      enlace: 'https://itsa.edu.bo',
      galeria: [
        'assets/eventos/admision2025.png',
        'assets/eventos/admision2025-1.png',
      ],
    },
    {
      id: 'fipab-feria',
      titulo: 'FIPAB – Feria de Proyectos',
      descripcion:
        'Exposición de proyectos destacados de estudiantes y docentes con enfoque productivo.',
      categoria: 'Ferias',
      fechaISO: '2025-03-18',
      lugar: 'Auditorio ITSA',
      imagen: 'assets/eventos/fipab.jpg',
    },
    {
      id: 'taller-afiche',
      titulo: 'Taller de Comunicación Visual',
      descripcion:
        'Sesión práctica para elaboración de piezas gráficas y afiches para difusión institucional.',
      categoria: 'Talleres',
      fechaISO: '2025-02-22',
      lugar: 'Laboratorio de Sistemas',
      imagen: 'assets/eventos/afiche.jpg',
    },
    {
      id: 'convenio-gobernador',
      titulo: 'Firma de Convenio Interinstitucional',
      descripcion:
        'Convenio para prácticas preprofesionales y cooperación técnica con la Gobernación.',
      categoria: 'Convenios',
      fechaISO: '2025-04-05',
      lugar: 'Salón Principal',
      imagen: 'assets/eventos/gobernador.jpg',
    },
    {
      id: 'defensas-trabajos',
      titulo: 'Defensas de Trabajos de Grado',
      descripcion:
        'Cronograma de defensas de proyectos y monografías de fin de carrera.',
      categoria: 'Académico',
      fechaISO: '2025-05-20',
      lugar: 'Aulas 301–305',
      imagen: 'assets/eventos/evento1.jpeg',
    },
    {
      id: 'acto-acad',
      titulo: 'Acto Académico – Reconocimientos',
      descripcion:
        'Reconocimiento a estudiantes destacados y presentación de resultados institucionales.',
      categoria: 'Autoridades',
      fechaISO: '2025-06-08',
      lugar: 'Patio de Honor',
      imagen: 'assets/eventos/admision2025-1.png',
    },
  ];

  /* =========================
     2) FILTROS / ESTADO UI
  ========================== */
  categorias: Categoria[] = [
    'Admisiones',
    'Ferias',
    'Talleres',
    'Convenios',
    'Académico',
    'Autoridades',
  ];

  q = '';                      // texto de búsqueda
  categoria: 'Todos' | Categoria = 'Todos';
  mes: 'Todos' | number = 'Todos';
  anio: 'Todos' | number = 'Todos';

  // paginación
  page = 1;
  pageSize = 6;

  // modal galería
  isModalOpen = false;
  modalImgs: string[] = [];

  /* =========================
     3) GETTERS CALCULADOS
  ========================== */

  // Eventos ordenados por fecha DESC
  get eventosOrdenados(): Evento[] {
    return [...this.eventos].sort(
      (a, b) => +new Date(b.fechaISO) - +new Date(a.fechaISO)
    );
  }

  // Años disponibles para filtrar
  get anios(): number[] {
    const set = new Set<number>();
    this.eventos.forEach((e) => set.add(new Date(e.fechaISO).getFullYear()));
    return Array.from(set).sort((a, b) => b - a);
  }

  // Filtro principal
  get filtrados(): Evento[] {
    return this.eventosOrdenados.filter((e) => {
      const txt = (this.q || '').toLowerCase();
      const cumpleTexto =
        !txt ||
        e.titulo.toLowerCase().includes(txt) ||
        e.descripcion.toLowerCase().includes(txt) ||
        e.lugar.toLowerCase().includes(txt) ||
        e.categoria.toLowerCase().includes(txt);

      const d = new Date(e.fechaISO);
      const cumpleCat = this.categoria === 'Todos' || e.categoria === this.categoria;
      const cumpleMes = this.mes === 'Todos' || d.getMonth() + 1 === this.mes;
      const cumpleAnio = this.anio === 'Todos' || d.getFullYear() === this.anio;

      return cumpleTexto && cumpleCat && cumpleMes && cumpleAnio;
    });
  }

  // Paginados
  get pageItems(): Evento[] {
    const i0 = (this.page - 1) * this.pageSize;
    return this.filtrados.slice(i0, i0 + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filtrados.length / this.pageSize));
  }

  // Próximos (los 4 más cercanos a partir de hoy)
  get proximos(): Evento[] {
    const hoy = new Date().setHours(0, 0, 0, 0);
    return this.eventosOrdenados
      .filter((e) => +new Date(e.fechaISO) >= hoy)
      .slice(0, 4);
  }

  /* =========================
     4) ACCIONES UI
  ========================== */
  setCat(c: 'Todos' | Categoria) {
    this.categoria = c;
    this.resetPage();
  }

  setMes(m: 'Todos' | number) {
    this.mes = m;
    this.resetPage();
  }

  setAnio(a: 'Todos' | number) {
    this.anio = a;
    this.resetPage();
  }

  resetPage() {
    this.page = 1;
  }

  // helpers para labels de mes
  monthLabel(i: number): string {
    const f = new Date(2025, i - 1, 1);
    return f.toLocaleString('es-BO', { month: 'long' });
  }

  // galería modal
  openGaleria(imgs?: string[]) {
    this.modalImgs = imgs && imgs.length ? imgs : [];
    this.isModalOpen = this.modalImgs.length > 0;
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalImgs = [];
  }
}
