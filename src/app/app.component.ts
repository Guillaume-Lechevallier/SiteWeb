import { AfterViewInit, Component, HostListener } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { ApropodemoiComponent } from './apropodemoi/apropodemoi.component';
import { ExperienceproComponent } from './experiencepro/experiencepro.component';
import { FormationscolaireComponent } from './formationscolaire/formationscolaire.component';
import { CompetenceComponent } from './competence/competence.component';
import { ProjetspersonnelComponent } from './projetspersonnel/projetspersonnel.component';
import { InfocomplementaireComponent } from './infocomplementaire/infocomplementaire.component';
import { ContactezmoiComponent } from './contactezmoi/contactezmoi.component';

interface SectionLink {
  id: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatToolbar,
    MatButtonModule,
    NgFor,
    ApropodemoiComponent,
    ExperienceproComponent,
    FormationscolaireComponent,
    CompetenceComponent,
    ProjetspersonnelComponent,
    InfocomplementaireComponent,
    ContactezmoiComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  readonly cvUrl = 'https://drive.google.com/uc?export=download&id=1y_8AR8-CU54g7YR9j3oapnYWLEaAxga3';
  readonly currentYear = new Date().getFullYear();

  readonly sections: SectionLink[] = [
    { id: 'about', label: 'À propos', description: 'Mon parcours et ma vision' },
    { id: 'experience', label: 'Expérience', description: 'Des missions marquantes' },
    { id: 'education', label: 'Formation', description: 'Un socle académique solide' },
    { id: 'skills', label: 'Compétences', description: 'Un éventail technique complet' },
    { id: 'projects', label: 'Réalisations', description: 'Des projets dont je suis fier' },
    { id: 'links', label: 'Liens', description: 'Contact et ressources utiles' },
    { id: 'contact', label: 'Contact', description: 'Discutons ensemble' }
  ];

  activeSection = this.sections[0].id;
  private lastGridInput = 0;
  private readonly gridInputCapture = (event: MouseEvent) => {
    if (event.button !== 0) {
      return;
    }

    // Un clic souris peut produire pointerdown, mousedown puis click.
    // La capture se fait au niveau de window pour traverser tous les calques.
    const now = performance.now();
    if (now - this.lastGridInput < 250) {
      return;
    }

    this.lastGridInput = now;
    const target = event.target instanceof HTMLElement ? event.target : null;
    const isInteractive = target?.closest('a, button, input, textarea, select, [contenteditable="true"]');
    if (!isInteractive) {
      event.preventDefault();
    }
    this.handleGridClick(event);
  };

  ngAfterViewInit() {
    window.addEventListener('pointerdown', this.gridInputCapture, true);
    window.addEventListener('pointerup', this.gridInputCapture, true);
    window.addEventListener('mousedown', this.gridInputCapture, true);
    window.addEventListener('mouseup', this.gridInputCapture, true);
    window.addEventListener('click', this.gridInputCapture, true);

    if (document.querySelector('script[data-shopalerte-marketing-grid]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'assets/marketing-grid.js';
    script.async = true;
    script.dataset['shopalerteMarketingGrid'] = 'true';
    document.body.appendChild(script);
  }

  handleGridClick(event: MouseEvent) {
    const marketingGrid = (window as Window & {
      ShopAlerteMarketingGrid?: { addPoint?: (clickEvent: MouseEvent) => void };
    }).ShopAlerteMarketingGrid;

    if (marketingGrid?.addPoint) {
      marketingGrid.addPoint(event);
      return;
    }

    this.handleGridClickFallback(event);
  }

  private handleGridClickFallback(event: MouseEvent) {
    const backdrop = document.querySelector<HTMLElement>('[data-sa-grid-backdrop="true"]');

    if (!backdrop || backdrop.dataset['saGridReady'] === 'true') {
      return;
    }

    const curve = backdrop.querySelector<HTMLElement>('.sa-grid-curve');
    if (!curve) {
      return;
    }

    const rect = backdrop.getBoundingClientRect();
    const grid = 70;
    const x = Math.max(grid, Math.min(rect.width - grid, Math.round((event.clientX - rect.left) / grid) * grid));
    const y = Math.max(grid * 2, Math.min(rect.height - grid, Math.round((event.clientY - rect.top) / grid) * grid));
    const dot = document.createElement('span');
    const isPink = Math.random() >= 0.5;
    dot.className = 'sa-grid-dot sa-grid-dot-manual is-active';
    dot.style.setProperty('--sa-dot-color', isPink ? '#eb168a' : '#2450b1');
    dot.style.setProperty('--sa-dot-glow', isPink ? 'rgba(235, 22, 138, 0.18)' : 'rgba(36, 80, 177, 0.18)');
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.opacity = '0.96';
    curve.appendChild(dot);

    const manualDots = curve.querySelectorAll('.sa-grid-dot-manual');
    if (manualDots.length > 40) {
      manualDots[0].remove();
    }
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll')
  handleScroll() {
    const offsets = this.sections.map((section) => {
      const element = document.getElementById(section.id);
      if (!element) {
        return { id: section.id, top: Number.MAX_SAFE_INTEGER };
      }
      const rect = element.getBoundingClientRect();
      return { id: section.id, top: Math.abs(rect.top) };
    });

    offsets.sort((a, b) => a.top - b.top);
    this.activeSection = offsets[0]?.id ?? this.activeSection;
  }
}
