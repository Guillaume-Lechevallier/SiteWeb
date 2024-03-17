import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-formationscolaire',
  standalone: true,
    imports: [
        MatTab,
        MatTabGroup
    ],
  templateUrl: './formationscolaire.component.html',
  styleUrl: './formationscolaire.component.css'
})
export class FormationscolaireComponent {

}
