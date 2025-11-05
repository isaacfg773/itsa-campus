import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Msg = { from: 'user' | 'bot'; text: string; attachments?: Array<{type:'link'|'image', url:string, label?:string}> };

@Component({
  selector: 'app-agente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agente.component.html',
  styleUrls: ['./agente.component.css']
})
export class AgenteComponent {
  // Estado UI
  input = signal('');
  busy  = signal(false);

  // Conversación
  messages = signal<Msg[]>([
    { from: 'bot', text: '¡Hola! Soy el Agente ITSA 🤖. ¿En qué puedo ayudarte? (admisión, carreras, requisitos, horarios…)' }
  ]);

  // Auto-scroll suave cada vez que cambian los mensajes
  constructor() {
    effect(() => {
      this.messages();
      queueMicrotask(() => {
        const el = document.querySelector('#messages');
        if (el) el.scrollTop = el.scrollHeight;
      });
    });
  }

  // Enviar mensaje (simulado). Luego reemplazamos por llamada a n8n.
  async send() {
    const text = this.input().trim();
    if (!text) return;

    // Tu mensaje
    this.messages.update(m => [...m, { from:'user', text }]);
    this.input.set('');

    // “Pensando…”
    this.busy.set(true);
    await new Promise(r => setTimeout(r, 500));

    // Respuesta simulada con adjuntos cuando detecta keywords frecuentes
    const lower = text.toLowerCase();
    const attachments: Msg['attachments'] = [];

    if (lower.includes('formulario') || lower.includes('inscrib')) {
      attachments.push({ type:'link', url:'https://orion.itsa.edu.bo/postulantes/registrarPostulante.xhtml', label:'Formulario de Admisión (ORION)' });
    }
    if (lower.includes('admis') || lower.includes('requisito')) {
      attachments.push({ type:'link', url:'https://itsa.edu.bo/2025/01/15/proceso-de-admision-nuevo-2025/', label:'Proceso de Admisión 2025' });
    }
    if (lower.includes('carrera') || lower.includes('oferta')) {
      attachments.push({ type:'link', url: location.origin + '/itsa-campus/#/oferta', label:'Oferta de Carreras' });
    }

    this.messages.update(m => [
      ...m,
      {
        from: 'bot',
        text: 'Recibido ✅. En breve conectaré con la base institucional para darte una respuesta precisa.',
        attachments
      }
    ]);

    this.busy.set(false);

    // ---- CUANDO CONECTEMOS n8n, reemplaza todo desde aquí por:
    // try {
    //   const res = await fetch('https://TU_N8N/webhook/itsa-agent', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', 'x-itsa-token': 'TU_TOKEN' },
    //     body: JSON.stringify({ userId: this.userId, message: text })
    //   });
    //   const data = await res.json(); // { reply, attachments? }
    //   this.messages.update(m => [...m, { from:'bot', text: data.reply, attachments: data.attachments }]);
    // } catch (e) {
    //   this.messages.update(m => [...m, { from:'bot', text: 'No pude conectar con el agente. Intenta más tarde 🙏.' }]);
    // } finally {
    //   this.busy.set(false);
    // }
  }

  // Atajo: botón “chip” que rellena y envía
  quickAsk(q: string) {
    this.input.set(q);
    this.send();
  }

  // (opcional) Identificador simple por sesión
  private get userId() {
    let id = sessionStorage.getItem('itsa_uid');
    if (!id) {
      id = 'web-' + Math.random().toString(36).slice(2);
      sessionStorage.setItem('itsa_uid', id);
    }
    return id;
  }
}
