import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface SkillItem {
  name: string;
  description: string;
  logo: string;
}

@Component({
  selector: 'app-competence',
  standalone: true,
  imports: [NgFor],
  templateUrl: './competence.component.html',
  styleUrl: './competence.component.css'
})
export class CompetenceComponent {
  readonly skills: SkillItem[] = [
    {
      name: 'Python',
      description:
        'Mon couteau suisse pour automatiser, orchestrer des APIs, traiter des données ou piloter des microcontrôleurs.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png'
    },
    {
      name: 'HTML',
      description:
        'Je conçois des interfaces claires et accessibles, souvent associées à des dashboards dynamiques.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png'
    },
    {
      name: 'CSS',
      description:
        'Du design système aux micro-interactions, j’utilise le CSS pour façonner des expériences raffinées.',
      logo: 'https://i.ibb.co/3NgZMcg/Sans-dsqdsqd2.png'
    },
    {
      name: 'Angular',
      description:
        'Mon framework de prédilection pour des applications web réactives, testables et maintenables.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/800px-Angular_full_color_logo.svg.png'
    },
    {
      name: 'TypeScript',
      description:
        'La sécurité du typage statique pour industrialiser des projets front complexes et collaboratifs.',
      logo: 'https://styles.redditmedia.com/t5_2v6gg/styles/communityIcon_4w7vh6c21f871.png'
    },
    {
      name: 'JavaScript',
      description:
        'Indispensable pour enrichir les interactions côté client et orchestrer certaines logiques serveur.',
      logo: 'https://humancoders-formations.s3.amazonaws.com/uploads/course/logo/14/formation-node-js.png'
    },
    {
      name: 'PowerShell',
      description:
        'Scripts d’automatisation, packaging d’applications et dashboards pour simplifier l’administration Windows.',
      logo: 'https://blog.cellenza.com/wp-content/uploads/2017/01/PowerShell_5.0_icon.png'
    },
    {
      name: 'Shell',
      description:
        'Automatisation sur Linux et macOS, déploiements silencieux et gestion d’environnements serveurs.',
      logo: 'https://d31ezp3r8jwmks.cloudfront.net/nll72fi399f3l14px0cvoyr2y69r'
    },
    {
      name: 'SQL',
      description:
        'Modélisation, requêtage et alimentation de dashboards à partir de bases relationnelles.',
      logo: 'https://assets-global.website-files.com/60ec34540d013784844d2ee2/63ada2a83ca6981ff3e7c391_sql2.png'
    },
    {
      name: 'C / C++',
      description:
        'Mes premières armes en algorithmie et en gestion fine des ressources.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png'
    },
    {
      name: 'C#',
      description:
        'Développement d’applications Windows Forms connectées et intégration avec des scripts d’automatisation.',
      logo: 'https://styles.redditmedia.com/t5_2s0xo/styles/communityIcon_btdkmklrsxs81.png'
    }
  ];

  readonly systems: SkillItem[] = [
    {
      name: 'Windows',
      description:
        "Déploiement de postes, packaging d'applications et support utilisateurs en environnement professionnel.",
      logo: 'https://c.clc2l.com/t/w/i/windows-11-JJBp_C.png'
    },
    {
      name: 'Linux',
      description:
        'Configuration de serveurs, automatisation via shell et supervision de services applicatifs.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tux.png/640px-Tux.png'
    },
    {
      name: 'macOS',
      description:
        "Prise en charge des environnements créatifs et intégration dans des écosystèmes hybrides.",
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/MacOS_wordmark_%282017%29.svg'
    }
  ];
}
