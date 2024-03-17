import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-infocomplementaire',
  standalone: true,
  imports: [
    MatIcon,
    MatGridList,
    MatGridTile,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './infocomplementaire.component.html',
  styleUrl: './infocomplementaire.component.css'
})
export class InfocomplementaireComponent {

}
