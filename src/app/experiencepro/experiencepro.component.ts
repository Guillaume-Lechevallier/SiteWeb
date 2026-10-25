import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

interface ExperienceItem {
  period: string;
  company: string;
  location: string;
  role: string;
  responsibilities: string[];
  solutions: string[];
  technologies: string[];
  outcomes?: string[];
  image?: string;
  imageAlt?: string;
}

@Component({
  selector: 'app-experiencepro',
  standalone: true,
  imports: [NgFor, NgIf, MatTab, MatTabGroup],
  templateUrl: './experiencepro.component.html',
  styleUrl: './experiencepro.component.css'
})
export class ExperienceproComponent {
  markImageUnavailable(event: Event) {
    const image = event.target as HTMLImageElement;
    image.parentElement?.classList.add('image-failed');
  }

  readonly experiences: ExperienceItem[] = [
    {
      period: 'Depuis 2024', company: 'C.A.E.N. Training', location: 'Paris',
      role: 'Responsable informatique et roboticien',
      responsibilities: [
        'Modernisation des postes de travail des collaborateurs et des apprenants.',
        'Administration du NAS, du réseau, de l’infrastructure audiovisuelle et des équipements automatisés.',
        'Support de proximité, supervision de la sécurité du parc et maintenance d’automates industriels.'
      ],
      solutions: [
        'Scripts de déploiement et d’automatisation des mises à jour.',
        'Migration d’une plateforme WordPress et mise en place de plateformes collaboratives.',
        'Réparations électroniques sur les équipements sportifs et suivi du câblage réseau.'
      ],
      technologies: ['PowerShell', 'Bash', 'WordPress', 'NAS', 'Réseau', 'Automates industriels'],
      outcomes: ['Déploiements plus maîtrisés et mises à jour automatisées.', 'Maintien opérationnel des services, du parc et des équipements du centre de formation.'],
      image: 'assets/caen-training.jpg', imageAlt: 'Bâtiment de C.A.E.N. Training'
    },
    {
      period: '2021/2022', company: 'Avem Groupe', location: 'Rennes', role: 'Administrateur bureautique',
      responsibilities: [
        'Conception de packages de déploiement pour un parc de plus de 3 000 postes.',
        'Orchestration des installations et des mises à jour dans un contexte de grand groupe.'
      ],
      solutions: ['Premières bases d’applications Angular appuyées par des requêtes SQL.', 'Outils de déploiement pour industrialiser l’installation des postes.'],
      technologies: ['Angular', 'SQL', 'Packaging applicatif', 'Déploiement de postes'],
      outcomes: ['Déploiement et maintenance d’un parc de plus de 3 000 postes.'],
      image: 'https://www.zupimages.net/up/22/19/nef9.png', imageAlt: 'Logo Avem Groupe'
    },
    {
      period: '2019/2021', company: 'Watsoft Distribution', location: 'Bordeaux', role: 'Technicien support et technicien interne',
      responsibilities: [
        'Assistance logicielle et support utilisateurs autour de N-Able, ISL et MDaemon.',
        'Déploiement du télétravail et accompagnement des utilisateurs.'
      ],
      solutions: ['Développement d’outils d’automatisation en PowerShell et Python.', 'Conception d’une application de contrôle d’accès en C# pilotant un Raspberry Pi.'],
      technologies: ['PowerShell', 'Python', 'C#', 'Windows Forms', 'Raspberry Pi', 'N-Able', 'ISL', 'MDaemon'],
      outcomes: ['Mise en place du télétravail et réalisation d’un prototype de contrôle d’accès connecté.'],
      image: 'https://www.zupimages.net/up/22/19/q9j9.png', imageAlt: 'Logo Watsoft Distribution'
    },
    {
      period: '2016', company: 'Delorme Informatique', location: 'Vimoutier', role: 'Stagiaire en boutique informatique',
      responsibilities: ['Dépannage de matériel informatique.', 'Remplacement d’écran d’iPhone et découverte de la relation client.'],
      solutions: ['Recherche de pannes et remise en service d’équipements.'],
      technologies: ['Maintenance matérielle', 'Dépannage'],
      image: 'https://www.zupimages.net/up/22/19/vfl7.png', imageAlt: 'Logo Delorme Informatique'
    },
    {
      period: 'Autres expériences', company: 'E.Leclerc L’Aigle et collège Molière', location: '', role: 'Postes en grande distribution et en milieu scolaire',
      responsibilities: ['Accueil, service et gestion de situations variées au contact du public.', 'Travail en équipe dans des environnements différents.'],
      solutions: [], technologies: [], outcomes: ['Développement du sens du service et de l’adaptation.']
    }
  ];
}
