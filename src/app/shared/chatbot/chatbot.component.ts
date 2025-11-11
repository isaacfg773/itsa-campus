import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type Msg = { from: 'user' | 'bot'; text: string };

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  private isOpen = signal(false);
  private isBusy = signal(false);
  input = '';

  private _messages = signal<Msg[]>([
    { from: 'bot', text: '👋 ¡Hola! Soy el Agente ITSA. Pregúntame por inscripciones, requisitos o horarios.' }
  ]);

  open() { return this.isOpen(); }
  busy() { return this.isBusy(); }
  messages() { return this._messages(); }
  toggle() { this.isOpen.update(v => !v); }

  send() {
    const text = (this.input || '').trim();
    if (!text || this.isBusy()) return;

    // añade el mensaje del usuario
    this._messages.update(arr => [...arr, { from: 'user', text }]);
    this.input = '';
    this.isBusy.set(true);

    // muestra "escribiendo…"
    this._messages.update(arr => [...arr, { from: 'bot', text: '⏳ Escribiendo…' }]);

    try {
      // normalización COMPATIBLE (quita tildes)
      const m = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // 👈 esta es la buena

      // respuesta por defecto
      let reply =
        'Puedo ayudarte con **requisitos**, **carreras**, **admisión** y **horarios**. ¿Qué deseas saber?';

      // reglas simples
      if (/^(hola|buenas|hey|holi|ola)\b/.test(m)) {
        reply = '¡Hola! 😊 Estás con el Agente ITSA. ¿Sobre qué tema deseas información?';
      } else if (/(requisit|document|papel|tramite)/.test(m)) {
        reply = '📎 Requisitos: CI (original y fotocopia), 2 fotos 3×3, certificado de egreso/RUDE, formulario de admisión y comprobante de pago.';
      } else if (/(inscrip|admis|postul)/.test(m)) {
        reply = '📝 Inscripciones 2026 abiertas. Completa el formulario desde la portada.';
      } else if (/(carrera|ofert|programa)/.test(m)) {
        reply = '🎓 Carreras: Sistemas Informáticos y Secretariado Ejecutivo.';
      } else if (/(horari|turno|clase)/.test(m)) {
        reply = '🕒 Horarios: Mañana 08:00–12:00 · Tarde 14:00–18:00 · Noche 18:30–22:00.';
      } else if (/(costo|precio|matricul|pago)/.test(m)) {
        reply = '💳 Los costos dependen de la carrera/turno. Consulta en Secretaría Académica.';
      } else if (/(ubic|direc|donde|mapa)/.test(m)) {
        reply = '📍 Sacaba – Cochabamba. En Google Maps: “Instituto Tecnológico Sacaba (ITSa)”.';
      }

      // simula latencia y responde
      setTimeout(() => {
        this._messages.update(arr => {
          const next = [...arr];
          next.pop(); // quita "Escribiendo…"
          next.push({ from: 'bot', text: reply });
          return next;
        });
        this.isBusy.set(false);
      }, 350);
    } catch (err) {
      console.error(err);
      // nunca lo dejamos colgado
      this._messages.update(arr => {
        const next = [...arr];
        next.pop(); // quita "Escribiendo…"
        next.push({ from: 'bot', text: '⚠️ Ocurrió un error. Intenta nuevamente.' });
        return next;
      });
      this.isBusy.set(false);
    }
  }
}