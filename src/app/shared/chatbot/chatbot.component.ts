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
    {
      from: 'bot',
      text:
        '👋 ¡Hola! Soy el Agente ITSA.\n' +
        'Puedo ayudarte con requisitos, trámites, inscripciones, carreras y horarios.\n\n' +
        'Por ejemplo, puedes preguntar:\n' +
        '• "Requisitos para certificado de calificaciones"\n' +
        '• "Qué necesito para legalizar mi certificado de egreso"\n' +
        '• "Constancia de inscripción"\n' +
        '• "Horario turno noche"'
    }
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

    // mensaje de "escribiendo…"
    this._messages.update(arr => [...arr, { from: 'bot', text: '⏳ Escribiendo…' }]);

    try {
      // normalización: minúsculas y sin tildes
      const m = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      let reply =
        'Puedo ayudarte con requisitos, trámites, inscripción, carreras y horarios.\n' +
        'Escribe por ejemplo: "requisitos certificado de calificaciones" o "constancia de inscripción".';

      /* =========================
         SALUDO / INFO GENERAL
      ============================*/
      if (/^(hola|buenas|hey|holi|ola)\b/.test(m)) {
        reply =
          '¡Hola! 😊 Estás con el Agente ITSA.\n\n' +
          'Puedo darte información sobre:\n' +
          '• Requisitos y trámites (egreso, calificaciones, duplicados, constancias, etc.)\n' +
          '• Carreras y horarios\n' +
          '• Inscripción y admisión\n\n' +
          'Dime qué necesitas saber 👇';
      }

      /* =========================
         CARRERAS Y HORARIOS
      ============================*/
      else if (/(carrera|ofert|programa)/.test(m)) {
        reply =
          '🎓 Carreras del Instituto Tecnológico Sacaba:\n' +
          '• Sistemas Informáticos\n' +
          '• Secretariado Ejecutivo\n\n' +
          'Para más detalle puedes revisar la sección "Carreras destacadas" en la página principal.';
      } else if (/(horari|turno|clase)/.test(m)) {
        reply =
          '🕒 Horarios de referencia:\n' +
          '• Turno Mañana: 08:00 – 12:00\n' +
          '• Turno Tarde: 14:00 – 18:00\n' +
          '• Turno Noche: 18:30 – 22:00\n\n' +
          'Confirma siempre en Secretaría Académica si hay cambios por gestión.';
      } else if (/(costo|precio|matricul|pago)/.test(m)) {
        reply =
          '💳 Los costos dependen del tipo de trámite, carrera y gestión.\n' +
          'Para montos actualizados (matrícula, mensualidades y certificados) ' +
          'consulta en Secretaría Académica o en la Unidad Administrativa.';
      } else if (/(ubic|direc|donde|mapa)/.test(m)) {
        reply =
          '📍 Ubicación del Instituto Tecnológico Sacaba (ITSA):\n' +
          'Municipio de Sacaba – Cochabamba.\n\n' +
          'Puedes buscar en Google Maps como: "Instituto Tecnológico Sacaba ITSA".';
      }

      /* =========================
         TRÁMITES Y REQUISITOS
      ============================*/

      // 1) LEGALIZACIÓN DE CERTIFICADO DE EGRESO
      else if (/(legaliz.*egreso|certificado de egreso|legalizacion de certificado)/.test(m)) {
        reply =
          '📄 Legalización de Certificado de Egreso\n\n' +
          'Requisitos:\n' +
          '• Carta dirigida a Rectorado (2 copias) — Ing. Olivia Vargas Mendieta, Rectora Instituto Tecnológico Sacaba.\n' +
          '• Certificado de egreso (fotocopia y original).\n' +
          '• Fotocopia de Cédula de Identidad.\n' +
          '• Depósito de 30 Bs al N° de Cuenta 10000054066888 (Banco Unión, cuenta mancomunada Vargas Mendieta Olivia y Huiza Arancibia Pablo).\n\n' +
          'Nota: la carta debe presentar nombre completo, C.I., carrera, gestión de egreso y motivo de la solicitud.\n' +
          'La solicitud tendrá respuesta después de cinco días hábiles.';
      }

      // 2) CERTIFICADO DE CALIFICACIONES
      else if (/certificad.*calificacion|kardex|notas globales/.test(m)) {
        reply =
          '📊 Certificado de Calificaciones\n\n' +
          'Requisitos:\n' +
          '• Haber sido estudiante del Instituto.\n' +
          '• Carta dirigida a Rectorado (2 copias) — Ing. Olivia Vargas Mendieta.\n' +
          '• Formularios o certificados de calificaciones (compra de la DDE).\n' +
          '• Fotocopia de certificado de nacimiento y C.I.\n' +
          '• Fotocopia de Diploma de Bachiller.\n' +
          '• Fotografías 3×4 (6 fotos para carreras semestrales y 3 para anuales).\n' +
          '• Depósito de 10 Bs por hoja al llenado (60 Bs semestral, 30 Bs anual) a la cuenta 10000054066888 del Banco Unión.\n\n' +
          'Nota: presentar en folder amarillo con funda transparente y nepack.\n' +
          'En la carátula deben figurar: nombre completo, carrera, gestiones de estudio y N° de celular.\n' +
          'La solicitud tendrá respuesta en cinco a diez días hábiles.';
      }

      // 3) FORMULARIO ACADÉMICO (TITULACIÓN INDIVIDUAL)
      else if (/formulario academico|titulacion individual/.test(m)) {
        reply =
          '📚 Formulario Académico (Titulación Individual)\n\n' +
          'Requisitos:\n' +
          '• Carta dirigida a Rectorado (2 copias) — Ing. Olivia Vargas Mendieta.\n' +
          '• Fotocopia de Cédula de Identidad.\n' +
          '• Fotocopia del Acta de Defensa.\n\n' +
          'Nota: la carta debe incluir nombre completo, C.I., carrera, gestiones de estudio y motivo de la solicitud.\n' +
          'La respuesta se emite en un plazo aproximado de cinco días hábiles.';
      }

      // 4) CERTIFICADO DE CONCLUSIÓN DE MATERIAS
      else if (/conclusion de materias|certificad.*materias|todas las materias/.test(m)) {
        reply =
          '📘 Certificado de Conclusión de Materias\n\n' +
          'Requisitos:\n' +
          '• Carta dirigida a Rectorado — Ing. Olivia Vargas Mendieta.\n' +
          '• Certificado de notas globales emitido por la carrera.\n' +
          '• Fotocopia de C.I.\n' +
          '• Depósito de 20 Bs (Banco Unión).\n\n' +
          'Nota: documento necesario para iniciar el proceso de titulación.\n' +
          'Tiempo de entrega aproximado: 5 días hábiles.';
      }

      // 5) CONSTANCIA DE DEFENSA DE GRADO
      else if (/constancia de defensa|defensa de grado/.test(m)) {
        reply =
          '🎓 Constancia de Defensa de Grado\n\n' +
          'Requisitos:\n' +
          '• Fotocopia del Acta de Defensa.\n' +
          '• Fotocopia de C.I.\n' +
          '• Depósito de 10 Bs (Banco Unión).\n\n' +
          'Nota: se entrega en 3 días hábiles después de la verificación en la unidad de titulación.';
      }

      // 6) DUPLICADO DE DIPLOMA ACADÉMICO
      else if (/duplicado.*diploma|perdi mi diploma|reponer diploma/.test(m)) {
        reply =
          '📑 Duplicado de Diploma Académico\n\n' +
          'Requisitos:\n' +
          '• Carta dirigida a Rectorado — Ing. Olivia Vargas Mendieta.\n' +
          '• Denuncia de pérdida ante la FELCC.\n' +
          '• Fotocopia de C.I.\n' +
          '• Depósito de 100 Bs (Banco Unión).\n\n' +
          'Nota: el duplicado se emite en un plazo aproximado de 10 días hábiles, luego de la revisión del archivo histórico.';
      }

      // 7) CONSTANCIA DE INSCRIPCIÓN
      else if (/constancia de inscrip|constancia de estudiante|soy estudiante regular/.test(m)) {
        reply =
          '🟢 Constancia de Inscripción\n\n' +
          'Requisitos:\n' +
          '• Formulario de matrícula o inscripción.\n' +
          '• Fotocopia de C.I.\n' +
          '• Depósito de 10 Bs (Banco Unión).\n\n' +
          'Nota: este documento acredita la condición de estudiante regular en la gestión actual.';
      }

      // 8) CERTIFICADO DE CONCLUSIÓN DE PRÁCTICAS
      else if (/conclusion de practicas|certificado de practicas|practicas profesionales/.test(m)) {
        reply =
          '🧾 Certificado de Conclusión de Prácticas\n\n' +
          'Requisitos:\n' +
          '• Carta dirigida a Rectorado — Ing. Olivia Vargas Mendieta.\n' +
          '• Informe de prácticas visado por el docente responsable.\n' +
          '• Fotocopia de C.I.\n' +
          '• Depósito de 15 Bs (Banco Unión).\n\n' +
          'Nota: documento válido para trámite de titulación o constancia laboral.';
      }

      // 9) CERTIFICADO DE ESTUDIOS COMPLETOS
      else if (/certificado de estudios completos|todas las materias aprobadas|estudios completos/.test(m)) {
        reply =
          '📚 Certificado de Estudios Completos\n\n' +
          'Requisitos:\n' +
          '• Carta dirigida a Rectorado — Ing. Olivia Vargas Mendieta.\n' +
          '• Certificado de calificaciones finales.\n' +
          '• Fotocopia de C.I. y Diploma de Bachiller.\n' +
          '• Depósito de 25 Bs (Banco Unión).\n\n' +
          'Nota: este certificado acredita la culminación de todas las materias del plan de estudios.\n' +
          'Tiempo de entrega aproximado: 7 días hábiles.';
      }

      // SI SOLO DICE "REQUISITOS" PERO NO ESPECIFICA
      else if (/(requisit|papel|documento).*/.test(m)) {
        reply =
          '📎 Tengo varios tipos de trámites. ¿De cuál deseas los requisitos?\n\n' +
          '• Legalización de certificado de egreso\n' +
          '• Certificado de calificaciones\n' +
          '• Formulario académico (titulación individual)\n' +
          '• Certificado de conclusión de materias\n' +
          '• Constancia de defensa de grado\n' +
          '• Duplicado de diploma académico\n' +
          '• Constancia de inscripción\n' +
          '• Certificado de conclusión de prácticas\n' +
          '• Certificado de estudios completos\n\n' +
          'Escríbeme por ejemplo: "requisitos certificado de calificaciones".';
      }

      /* =========================
         ADMISION / LINKS (texto)
      ============================*/

      else if (
        /(proceso de admision|proceso.*admis|pasos.*admis|como me inscribo|como inscribirme|nuevo ingreso 2025)/.test(
          m
        )
      ) {
        reply =
          '📝 Proceso de Admisión 2025 – ITSA\n\n' +
          '1) Revisa la información oficial del proceso de admisión en:\n' +
          'https://itsa.edu.bo/2025/01/15/proceso-de-admision-nuevo-2025/\n\n' +
          '2) Regístrate como postulante en la plataforma ORION (formulario en línea):\n' +
          'https://orion.itsa.edu.bo/postulantes/registrarPostulante.xhtml\n\n' +
          '3) Adjunta la documentación solicitada.\n' +
          '4) Realiza el depósito bancario según el arancel vigente.\n' +
          '5) Presenta tus documentos en Secretaría Académica.';
      }

      else if (
        /(formulario.*admis|formulario.*inscrip|formulario de ingreso|registrar postulante|formulario online|formulario de postulante)/.test(
          m
        )
      ) {
        reply =
          '📄 Formulario de Admisión / Registro de Postulante\n\n' +
          'Puedes llenar tu formulario en línea en la plataforma ORION:\n' +
          'https://orion.itsa.edu.bo/postulantes/registrarPostulante.xhtml\n\n' +
          'Recomendaciones:\n' +
          '• Ten a mano tu Cédula de Identidad.\n' +
          '• Revisa bien tus datos antes de enviar.\n' +
          '• Guarda o imprime el comprobante de registro.';
      }

      else if (/(inscrip|admis|postul)/.test(m)) {
        reply =
          '📝 Inscripción / Admisión ITSA\n\n' +
          'Pasos generales:\n' +
          '• Revisar el proceso de admisión 2025:\n' +
          '  https://itsa.edu.bo/2025/01/15/proceso-de-admision-nuevo-2025/\n' +
          '• Registrar tus datos en el formulario de postulante (ORION):\n' +
          '  https://orion.itsa.edu.bo/postulantes/registrarPostulante.xhtml\n' +
          '• Presentar tu documentación en Secretaría Académica.\n' +
          '• Realizar el depósito bancario según el arancel vigente.';
      }

      // RESPUESTA POR DEFECTO
      else {
        reply =
          'No estoy seguro de entender tu consulta 😅.\n\n' +
          'Puedo ayudarte con:\n' +
          '• Requisitos y trámites administrativos (egreso, calificaciones, constancias, duplicados, etc.)\n' +
          '• Inscripción, carreras y horarios\n\n' +
          'Prueba escribiendo algo como:\n' +
          '• "requisitos certificado de calificaciones"\n' +
          '• "constancia de inscripcion"\n' +
          '• "duplicado de diploma academico"\n' +
          '• "horario turno noche"';
      }

      // simula latencia
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
      this._messages.update(arr => {
        const next = [...arr];
        next.pop();
        next.push({
          from: 'bot',
          text:
            '⚠️ Ocurrió un error interno en el chatbot. Intenta nuevamente o consulta en Secretaría Académica.'
        });
        return next;
      });
      this.isBusy.set(false);
    }
  }
}
