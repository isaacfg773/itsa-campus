import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Stat = { label: string; value: string };
type Valor = { icon: string; titulo: string; texto: string };
type Hito = { anio: string; titulo: string; desc: string };

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css'],
})
export class NosotrosComponent {

  // 👇 Reemplaza estos textos con el contenido exacto del sitio (56-2)
  titulo = 'Instituto Tecnológico Sacaba';
  subtitulo = 'Formación técnica de calidad con compromiso social y excelencia académica.';
  mision = `Formar profesionales técnicos y tecnológicos competentes, con valores humanos
  y compromiso con el desarrollo productivo, cultural y social del país.`;
  vision = `Ser un instituto tecnológico referente a nivel nacional por su calidad educativa,
  investigación aplicada e interacción con el sector productivo.`;

  // Puedes pegar aquí un párrafo institucional “Quiénes somos”
  quienesSomos = `Somos una institución pública de educación superior técnica y tecnológica,
  con carreras acreditadas, docentes especializados y convenios con el sector productivo.`;

  // Cifras/estadísticas destacadas (si las tienes)
  stats: Stat[] = [
    { label: 'Años de trayectoria', value: '10+' },
    { label: 'Carreras', value: '6' },
    { label: 'Sedes', value: 'Sacaba' },
    { label: 'Convenios', value: '30+' },
  ];

  // Valores institucionales (modifica según la página)
  valores: Valor[] = [
    { icon: '🌱', titulo: 'Responsabilidad', texto: 'Actuamos con ética y compromiso público.' },
    { icon: '🧩', titulo: 'Excelencia', texto: 'Mejora continua y estándares de calidad.' },
    { icon: '🤝', titulo: 'Trabajo colaborativo', texto: 'Vinculación con comunidad y empresas.' },
    { icon: '🧠', titulo: 'Innovación', texto: 'Investigación aplicada y tecnología.' },
  ];

  // Línea de tiempo / Hitos (ajusta con tu historia real)
  historia: Hito[] = [
    { anio: '2015', titulo: 'R.M. Nº 995/2015', desc: 'Autorización y consolidación institucional.' },
    { anio: '2018', titulo: 'Vinculación productiva', desc: 'Convenios con empresas y sector público.' },
    { anio: '2022', titulo: 'Modernización', desc: 'Laboratorios y procesos digitalizados.' },
    { anio: '2024', titulo: 'Expansión académica', desc: 'Nuevas mallas y proyectos de I+D.' },
  ];

  // Logos/galería (pon tus rutas reales en assets)
  logos = [
    { src: 'assets/home/logo.jpg', alt: 'Logo ITSA' },
  ];

  // CTA contacto
  direccion = 'Av. Circunvalación Sur entre Granado e Ismael Céspedes, Sacaba';
  telefono = '67598222';
  email = 'institutotecnologicoitsa@gmail.com';
  whatsapp = 'https://api.whatsapp.com/send?phone=59167598222';
}
