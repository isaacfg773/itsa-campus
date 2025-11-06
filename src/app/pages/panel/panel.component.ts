import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Tab = 'carreras' | 'noticias' | 'horarios' | 'requisitos';


@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  // pestaña activa
  tab = signal<Tab>('carreras');

  // switches del agente
  iaAgente = signal(true);
  n8nTelegram = signal(false);
  agenteEnSitio = signal(true);

  // mock de items por sección
    items: Record<Tab, { titulo: string; fecha: string }[]> = {
      carreras: [
        { titulo: 'Sistemas Informáticos', fecha: '2025-06-01' },
        { titulo: 'Gastronomía', fecha: '2025-05-28' },
        { titulo: 'Secretariado Ejecutivo', fecha: '2025-05-10' },
      ],
      noticias: [
        { titulo: 'Inicio de Clases Gestión 2025', fecha: '2025-02-15' },
        { titulo: 'Feria Tecnológica ITSA', fecha: '2025-05-12' },
      ],
      horarios: [
        { titulo: 'Turno Mañana – 1er Semestre', fecha: '2025-02-10' },
        { titulo: 'Turno Noche – 2do Semestre', fecha: '2025-08-01' },
      ],
      requisitos: [
        { titulo: 'Certificado de Egreso', fecha: '2025-04-05' },
        { titulo: 'Certificado de Calificaciones', fecha: '2025-03-30' },
      ],
    };


  // formulario simple (banners / ficha)
  form = {
    titulo: '',
    fecha: new Date().toISOString().slice(0, 10)
  };

  // Cambiar pestaña
  setTab(t: Tab) {
    this.tab.set(t);
  }

  // Limpiar formulario
  nuevo() {
    this.form.titulo = '';
    this.form.fecha = new Date().toISOString().slice(0, 10);
  }

  // Editar un registro
  editar(i: number) {
    const t = this.tab();
    const it = this.items[t][i];
    this.form.titulo = it.titulo;
    this.form.fecha = it.fecha;
  }

  // Publicar un nuevo registro
  publicar() {
    const t = this.tab();
    if (!this.form.titulo.trim()) return;
    this.items[t].unshift({ titulo: this.form.titulo.trim(), fecha: this.form.fecha });
    this.form.titulo = '';
  }

  // Iniciar el chat del agente
  iniciarChat() {
    alert('Aquí se abriría el chat del Agente Inteligente (integración con n8n).');
  }
}
