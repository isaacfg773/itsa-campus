import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Horario {
  docente: string;
  materia: string;
  curso: string;
  dia: string;
  hora: string;
  aula: string;
}

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent {
  q = '';

  horarios: Horario[] = [
    { docente: 'Lic. Juan Pérez', materia: 'Administración I', curso: '1° A', dia: 'Lunes', hora: '08:00 - 09:30', aula: 'A-101' },
    { docente: 'Ing. María Flores', materia: 'Programación II', curso: '2° B', dia: 'Martes', hora: '09:45 - 11:15', aula: 'Lab. SI' },
    { docente: 'Lic. Carlos Gutiérrez', materia: 'Contabilidad General', curso: '1° C', dia: 'Miércoles', hora: '10:00 - 11:30', aula: 'A-203' },
    { docente: 'Chef Ana Laura', materia: 'Cocina Internacional', curso: '3° Gastronomía', dia: 'Jueves', hora: '14:00 - 16:00', aula: 'Cocina 2' },
    { docente: 'Tec. José Maldonado', materia: 'Motores a Diésel', curso: '2° Mecánica', dia: 'Viernes', hora: '08:00 - 10:00', aula: 'Taller M2' },
  ];

  get horariosFiltrados(): Horario[] {
    const query = this.q.trim().toLowerCase();
    return this.horarios.filter(h =>
      !query ||
      h.docente.toLowerCase().includes(query) ||
      h.materia.toLowerCase().includes(query) ||
      h.curso.toLowerCase().includes(query)
    );
  }
}
