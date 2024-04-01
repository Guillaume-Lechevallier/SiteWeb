import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ApropodemoiComponent} from "../apropodemoi/apropodemoi.component";
import {CompetenceComponent} from "../competence/competence.component";
import {ContactezmoiComponent} from "../contactezmoi/contactezmoi.component";
import {ExperienceproComponent} from "../experiencepro/experiencepro.component";
import {FormationscolaireComponent} from "../formationscolaire/formationscolaire.component";
import {InfocomplementaireComponent} from "../infocomplementaire/infocomplementaire.component";
import {ProjetspersonnelComponent} from "../projetspersonnel/projetspersonnel.component";
import {BotapiComponent} from "../botapi/botapi.component";

@Component({
  selector: 'app-defispersonnel',
  standalone: true,
  imports: [
    MatTab,
    ApropodemoiComponent,
    CompetenceComponent,
    ContactezmoiComponent,
    ExperienceproComponent,
    FormationscolaireComponent,
    InfocomplementaireComponent,
    MatTabGroup,
    ProjetspersonnelComponent,
    BotapiComponent,
  ],
  templateUrl: './defispersonnel.component.html',
  styleUrl: './defispersonnel.component.css'
})
export class DefispersonnelComponent {

}
