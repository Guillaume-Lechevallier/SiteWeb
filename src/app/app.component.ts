import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {ApropodemoiComponent} from "./apropodemoi/apropodemoi.component";
import {ExperienceproComponent} from "./experiencepro/experiencepro.component";
import {FormationscolaireComponent} from "./formationscolaire/formationscolaire.component";
import {CompetenceComponent} from "./competence/competence.component";
import {ProjetspersonnelComponent} from "./projetspersonnel/projetspersonnel.component";
import {InfocomplementaireComponent} from "./infocomplementaire/infocomplementaire.component";
import {TooltipComponent} from "@angular/material/tooltip";
import {MatTooltipModule} from '@angular/material/tooltip';
import {ContactezmoiComponent} from "./contactezmoi/contactezmoi.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTooltipModule, RouterOutlet, MatToolbar, MatTabGroup, MatTab, MatIcon, ApropodemoiComponent, ExperienceproComponent, FormationscolaireComponent, CompetenceComponent, ProjetspersonnelComponent, InfocomplementaireComponent, TooltipComponent, ContactezmoiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled';
}
