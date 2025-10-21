import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface ExternalLink {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
}

@Component({
  selector: 'app-infocomplementaire',
  standalone: true,
  imports: [NgFor],
  templateUrl: './infocomplementaire.component.html',
  styleUrl: './infocomplementaire.component.css'
})
export class InfocomplementaireComponent {
  readonly permit = 'Permis B en cours (code validé)';

  readonly hobbies: string[] = [
    "Informatique et programmation",
    "Robotique et électronique",
    "Jeux vidéo (Minecraft, VR, expériences immersives)",
    "Récupération, remise à neuf et revente de PC",
    "Jardinage pour équilibrer le numérique et le concret"
  ];

  readonly links: ExternalLink[] = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/guillaume-lechevallier/',
      icon: '🌐',
      external: true
    },
    {
      label: 'GitHub',
      href: 'https://github.com/Guillaume-Lechevallier',
      icon: '</>',
      external: true
    },
    {
      label: 'Téléphone',
      href: 'tel:0787063938',
      icon: '📞'
    },
    {
      label: 'Email',
      href: 'mailto:moilechevallier@gmail.com',
      icon: '✉️'
    },
    {
      label: 'MakerWorld',
      href: 'https://makerworld.com/en/u/2700611989',
      icon: '🛠️',
      external: true
    }
  ];
}
