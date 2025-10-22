import { AfterViewInit, Component, HostListener, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { ApropodemoiComponent } from './apropodemoi/apropodemoi.component';
import { ExperienceproComponent } from './experiencepro/experiencepro.component';
import { FormationscolaireComponent } from './formationscolaire/formationscolaire.component';
import { CompetenceComponent } from './competence/competence.component';
import { ProjetspersonnelComponent } from './projetspersonnel/projetspersonnel.component';
import { InfocomplementaireComponent } from './infocomplementaire/infocomplementaire.component';
import { ContactezmoiComponent } from './contactezmoi/contactezmoi.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

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
    MatSidenavModule,
    NgFor,
    NgIf,
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
export class AppComponent implements AfterViewInit, OnDestroy {
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
  navOverflow = false;

  @ViewChild('navBar') private navBar?: ElementRef<HTMLElement>;
  @ViewChild('drawer') private drawer?: MatSidenav;

  private resizeObserver?: ResizeObserver;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit() {
    this.evaluateNavOverflow();
    const element = this.navBar?.nativeElement;
    if (element) {
      this.resizeObserver = new ResizeObserver(() => {
        this.zone.run(() => this.evaluateNavOverflow());
      });
      this.resizeObserver.observe(element);
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  scrollTo(sectionId: string, closeDrawer = false) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (closeDrawer && this.drawer?.opened) {
      this.drawer.close();
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

  @HostListener('window:resize')
  handleResize() {
    this.evaluateNavOverflow();
  }

  private evaluateNavOverflow() {
    const element = this.navBar?.nativeElement;
    if (!element) {
      this.navOverflow = false;
      return;
    }
    const hasOverflow = element.scrollWidth - element.clientWidth > 2;
    this.navOverflow = hasOverflow;
    if (!hasOverflow) {
      this.drawer?.close();
    }
  }
}
