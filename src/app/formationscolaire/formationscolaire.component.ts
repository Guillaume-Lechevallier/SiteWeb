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
  markImageUnavailable(event: Event) {
    const image = event.target as HTMLImageElement;
    image.parentElement?.classList.add('image-failed');
  }
}
