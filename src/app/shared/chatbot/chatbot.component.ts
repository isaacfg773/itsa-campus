import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Msg = { from: 'user' | 'bot'; text: string };

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent {
  open = signal(false);
  busy = signal(false);
  input = signal('');
  messages = signal<Msg[]>([
    { from: 'bot', text: '¡Hola! Soy el Agente ITSA 🤖 ¿en qué te ayudo?' },
  ]);

  toggle() { this.open.update(v => !v); }

  async send() {
    const text = this.input().trim();
    if (!text) return;
    this.messages.update(m => [...m, { from: 'user', text }]);
    this.input.set('');
    this.busy.set(true);
    await new Promise(r => setTimeout(r, 500));
    this.messages.update(m => [...m, { from: 'bot', text: 'Recibido. Pronto conectaré con n8n.' }]);
    this.busy.set(false);
  }
}
