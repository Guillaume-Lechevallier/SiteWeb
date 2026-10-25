import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { isPlatformBrowser, NgFor } from '@angular/common';
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
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
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
  readonly cvUrl = 'assets/Guillaume-Lechevallier-CV.pdf';
  readonly currentYear = new Date().getFullYear();

  readonly sections: SectionLink[] = [
    { id: 'about', label: 'À propos' },
    { id: 'experience', label: 'Expérience' },
    { id: 'education', label: 'Formation' },
    { id: 'skills', label: 'Compétences' },
    { id: 'projects', label: 'Réalisations' },
    { id: 'links', label: 'Liens' },
    { id: 'contact', label: 'Contact' }
  ];

  activeSection = this.sections[0].id;
  private readonly isBrowser: boolean;
  private readonly gridInputCapture = (event: MouseEvent) => {
    if (event.button !== 0) {
      return;
    }
    // Le clic traverse les calques sans annuler la sélection native du texte.
    this.handleGridClick(event);
  };

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) {
      return;
    }

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
    if (!this.isBrowser) {
      return;
    }

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
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
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
