import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface SkillItem {
  name: string;
  description: string;
  logo: string;
}

interface SkillCategory {
  name: string;
  description: string;
  skills: SkillItem[];
}

@Component({
  selector: 'app-competence',
  standalone: true,
  imports: [NgFor],
  templateUrl: './competence.component.html',
  styleUrl: './competence.component.css'
})
export class CompetenceComponent {
  readonly categories: SkillCategory[] = [
    {
      name: 'Développement Front-End',
      description: 'Interfaces web, composants réutilisables et expériences responsive.',
      skills: [
        { name: 'HTML', description: 'Interfaces claires et accessibles, souvent associées à des dashboards dynamiques.', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png' },
        { name: 'CSS', description: 'Design système, mise en page et micro-interactions.', logo: 'https://i.ibb.co/3NgZMcg/Sans-dsqdsqd2.png' },
        { name: 'Angular', description: 'Applications web réactives, testables et maintenables.', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/800px-Angular_full_color_logo.svg.png' },
        { name: 'TypeScript', description: 'Typage statique pour industrialiser des projets front complexes et collaboratifs.', logo: 'https://styles.redditmedia.com/t5_2v6gg/styles/communityIcon_4w7vh6c21f871.png' },
        { name: 'JavaScript', description: 'Interactions côté client et orchestration de certaines logiques serveur.', logo: 'https://humancoders-formations.s3.amazonaws.com/uploads/course/logo/14/formation-node-js.png' }
      ]
    },
    {
      name: 'Développement Back-End et API',
      description: 'Logique applicative, services et intégration avec les données.',
      skills: [
        { name: 'Python', description: 'Automatisation, orchestration d’API, traitement de données et pilotage de microcontrôleurs.', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png' },
        { name: 'C#', description: 'Développement d’applications Windows Forms connectées et intégration avec des scripts d’automatisation.', logo: 'https://styles.redditmedia.com/t5_2s0xo/styles/communityIcon_btdkmklrsxs81.png' }
      ]
    },
    {
      name: 'Bases de données',
      description: 'Modélisation, requêtage et alimentation de solutions applicatives.',
      skills: [
        { name: 'SQL', description: 'Requêtage et alimentation de dashboards à partir de bases relationnelles.', logo: 'https://assets-global.website-files.com/60ec34540d013784844d2ee2/63ada2a83ca6981ff3e7c391_sql2.png' }
      ]
    },
    {
      name: 'Automatisation et scripting',
      description: 'Scripts de déploiement, tâches répétitives et administration outillée.',
      skills: [
        { name: 'PowerShell', description: 'Automatisation, packaging d’applications et dashboards pour simplifier l’administration Windows.', logo: 'https://blog.cellenza.com/wp-content/uploads/2017/01/PowerShell_5.0_icon.png' },
        { name: 'Shell', description: 'Automatisation sur Linux et macOS, déploiements silencieux et gestion d’environnements serveurs.', logo: 'https://d31ezp3r8jwmks.cloudfront.net/nll72fi399f3l14px0cvoyr2y69r' }
      ]
    },
    {
      name: 'Systèmes, réseau et DevOps',
      description: 'Postes, serveurs, réseaux et environnements applicatifs.',
      skills: [
        { name: 'Windows', description: 'Déploiement de postes, packaging d’applications et support utilisateurs en environnement professionnel.', logo: 'https://c.clc2l.com/t/w/i/windows-11-JJBp_C.png' },
        { name: 'Linux', description: 'Configuration de serveurs, automatisation via shell et supervision de services applicatifs.', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tux.png/640px-Tux.png' },
        { name: 'macOS', description: 'Prise en charge des environnements créatifs et intégration dans des écosystèmes hybrides.', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/MacOS_wordmark_%282017%29.svg' }
      ]
    },
    {
      name: 'IA, robotique et électronique',
      description: 'Compétences illustrées par les projets d’IA, de prototypage et de systèmes connectés.',
      skills: [
        { name: 'C / C++', description: 'Premières armes en algorithmie et en gestion fine des ressources.', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png' },
        { name: 'Python appliqué', description: 'Utilisation dans des projets d’IA, d’automatisation et de pilotage de matériel.', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png' }
      ]
    }
  ];
}
