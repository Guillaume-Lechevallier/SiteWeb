import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

interface ProjectItem {
  name: string;
  objective: string;
  features: string[];
  stack: string[];
  role: string;
  status?: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  linkLabel?: string;
  linkUrl?: string;
  featured?: string;
}

@Component({
  selector: 'app-projetspersonnel',
  standalone: true,
  imports: [NgFor, NgIf, MatTabGroup, MatTab],
  templateUrl: './projetspersonnel.component.html',
  styleUrl: './projetspersonnel.component.css'
})
export class ProjetspersonnelComponent {
  markImageUnavailable(event: Event) {
    const image = event.target as HTMLImageElement;
    image.parentElement?.classList.add('image-failed');
  }

  readonly projects: ProjectItem[] = [
    {
      name: 'Détection varroas (IA)',
      objective: 'Automatiser le comptage de varroas sur des feuilles graissées pour contribuer au suivi sanitaire des ruches.',
      features: ['Dataset annoté YOLO.', 'Double classe varroa marron/blanc.', 'Visualisation et suivi sanitaire instantané.'],
      stack: ['Python 3', 'YOLOv8 Ultralytics', 'OpenCV', 'NumPy', 'LabelImg / Roboflow', 'Colab', 'Streamlit'],
      role: 'Conception du projet d’automatisation et préparation des données et de la chaîne d’entraînement.',
      featured: 'IA'
    },
    {
      name: 'Contrôle d’accès intelligent',
      objective: 'Sécuriser l’accès à une salle serveur grâce à une application d’authentification et un dispositif connecté.',
      features: ['Authentification via Active Directory.', 'Pilotage de la porte par Raspberry Pi.', 'Notifications en temps réel.', 'Maquette physique avec capteurs et mécanisme d’entraînement.'],
      stack: ['C#', 'Windows Forms', 'Active Directory', 'Raspberry Pi', 'SolidWorks', 'Impression 3D'],
      role: 'Conception de l’application, de l’électronique et de la maquette physique.',
      status: 'Prototype',
      image: 'https://i.ibb.co/X2XnJdD/appliporteauth.png', imageAlt: 'Console de contrôle d’accès', caption: 'Console d’authentification et de gestion de la porte sécurisée.',
      featured: 'Robotique'
    },
    {
      name: 'Application Web téléphonie',
      objective: 'Remplacer un fichier Excel de gestion de numéros professionnels par une application web structurée et évolutive.',
      features: ['Interface web Angular.', 'API dédiée.', 'Stockage dans une base MariaDB.'],
      stack: ['Angular', 'API Node.js', 'MariaDB', 'SQL'],
      role: 'Développement de l’application web et conception de l’architecture front, API et base de données.',
      image: 'https://i.ibb.co/sWgF3MX/Shemaapplit-l-phonie.png', imageAlt: 'Schéma d’infrastructure téléphonie', caption: 'Architecture de la solution : front Angular, API Node et base MariaDB.',
      featured: 'Full-Stack'
    },
    {
      name: 'Streaming & IA',
      objective: 'Connecter un bot à Twitch pour exploiter le chat en temps réel et déclencher des actions.',
      features: ['Récupération des messages Twitch.', 'Modération et déclenchement d’actions.', 'Exploration d’usages combinant bot et IA.'],
      stack: ['Twitch', 'Bot', 'IA'],
      role: 'Développement du bot et exploration des interactions avec les services de streaming.',
      image: 'https://i.ibb.co/6mxPh7M/jhqsdgsqhgfdytusqgfhcgvdqsufduyhsqfd.png', imageAlt: 'Interface de récupération Twitch',
      linkLabel: 'Code disponible sur GitHub'
    },
    {
      name: 'Assistant vocal augmenté',
      objective: 'Explorer une interaction vocale capable de comprendre une demande et de produire une réponse contextualisée.',
      features: ['Compréhension de la voix.', 'Interrogation de sources en ligne.', 'Réponse générée à partir du contexte.'],
      stack: ['Google Assistant', 'API ChatGPT', 'Voix'],
      role: 'Conception et intégration du prototype d’assistant vocal.'
    },
    {
      name: 'Jarvis wearable',
      objective: 'Créer un assistant portable inspiré d’un Pip-Boy, capable de répondre depuis un boîtier porté au poignet.',
      features: ['Raspberry Pi 4 intégré dans un boîtier imprimé en 3D.', 'Connexion à OpenAI et Google Assistant.', 'Module d’alimentation embarqué en évolution.'],
      stack: ['Raspberry Pi 4', 'OpenAI', 'Google Assistant', 'Impression 3D'],
      role: 'Conception du prototype matériel et intégration des services vocaux.',
      status: 'En développement',
      image: 'https://i.ibb.co/t3xTWCv/429934417-1761034327729002-2343471779999387977-n.jpg', imageAlt: 'Prototype Jarvis wearable',
      featured: 'Robotique'
    },
    {
      name: 'Partage de QR code Basic-Fit',
      objective: 'Synchroniser un QR code mis à jour en continu depuis une machine virtuelle pour gérer un accès partagé.',
      features: ['Synchronisation du code.', 'Mise à jour continue via une machine virtuelle.', 'Partage contrôlé avec des proches.'],
      stack: ['Script', 'Machine virtuelle', 'QR code'],
      role: 'Développement du script de synchronisation et de partage.',
      image: 'https://i.ibb.co/4dhVYGh/Capture-d-cran-2024-03-06-043110.png', imageAlt: 'Interface de partage QR code'
    },
    {
      name: 'Petit Pas',
      objective: 'Transformer des missions et habitudes quotidiennes en parcours ludique de motivation et de récompenses.',
      features: ['Profils indépendants.', 'Missions quotidiennes et surprises.', 'Progression, historique et demandes de récompenses.', 'Interface PWA adaptée aux tablettes et navigateurs anciens.'],
      stack: ['Node.js', 'Express', 'PostgreSQL', 'PWA', 'JavaScript'],
      role: 'Conception et développement de l’application web mobile-first et de son backend.',
      featured: 'Full-Stack'
    },
    {
      name: 'ShopAlerte',
      objective: 'Remplacer les cartes de fidélité papier par une plateforme numérique destinée aux commerçants.',
      features: ['Cartes Apple Wallet et Google Wallet.', 'QR codes, scans et système de points.', 'Gestion des clients, cartes, notifications et comptes commerçants.', 'Droits séparés entre administrateurs, gestionnaires et commerçants.'],
      stack: ['Angular', 'Python', 'Base de données', 'Docker', 'Apple Wallet', 'Google Wallet'],
      role: 'Conception et développement de la plateforme, du front-end, du back-end et de son déploiement.',
      featured: 'Full-Stack'
    },
    {
      name: 'Quizzzzz',
      objective: 'Fournir un service public de quiz rattaché à ShopAlerte, tout en séparant son interface du cœur de gestion commerçant.',
      features: ['Service accessible depuis un sous-domaine dédié.', 'Publication derrière un reverse proxy.', 'HTTPS automatique, compression et vérification de l’accès public.'],
      stack: ['Web', 'Docker', 'Caddy', 'HTTPS / Let’s Encrypt'],
      role: 'Développement du service et administration de sa publication.',
      featured: 'Déploiement'
    },
    {
      name: 'Ren’Py Live Translator',
      objective: 'Traduire localement les textes de jeux narratifs Ren’Py au moment où ils sont affichés.',
      features: ['Interception et remplacement progressif des textes.', 'Cache JSON partageable.', 'Traductions en arrière-plan sans bloquer le jeu.', 'Conservation des balises, variables et corrections manuelles.'],
      stack: ['Python', 'Ren’Py', 'Ollama', 'TranslateGemma', 'JSON'],
      role: 'Développement de l’outil de traduction locale et de son mécanisme de cache.',
      featured: 'Automatisation'
    },
    {
      name: 'DISBOT / Luna',
      objective: 'Accompagner les parties Archipelago en transformant les événements des rooms en messages Discord compréhensibles.',
      features: ['Lecture des journaux de rooms.', 'Détection des connexions, checks, objets et objectifs.', 'Annonces de rooms, liens de suivi et commande `/apcheck`.', 'Persistance de l’état de lecture pour éviter les doublons.'],
      stack: ['Python', 'Discord', 'Archipelago', 'Docker'],
      role: 'Développement du bot, intégration Archipelago et déploiement Docker.',
      featured: 'Automatisation'
    },
    {
      name: 'Archipelago / Risk of Rain 2',
      objective: 'Relier Risk of Rain 2 à Archipelago pour partager la progression entre plusieurs jeux et joueurs.',
      features: ['Client de connexion à la room.', 'Gestion des items et des checks.', 'Affichage de la progression en jeu.', 'Handlers pour stages, shrines et portails.'],
      stack: ['C#', 'BepInEx', 'Thunderstore', 'Archipelago', 'Risk of Rain 2'],
      role: 'Développement et maintenance du mod et de ses intégrations de gameplay.'
    },
    {
      name: 'RustDesk',
      objective: 'Administrer une solution de prise en main à distance fiable entre ordinateurs.',
      features: ['Configuration du client.', 'Administration des serveurs d’identification et de relais.', 'Diagnostic de connexion directe, réseau local et NAT.', 'Prise en compte des services Windows.'],
      stack: ['RustDesk', 'Windows', 'Réseau', 'NAT', 'Serveurs de relais'],
      role: 'Administration, diagnostic et maintien des outils et serveurs RustDesk.'
    }
  ];
}
