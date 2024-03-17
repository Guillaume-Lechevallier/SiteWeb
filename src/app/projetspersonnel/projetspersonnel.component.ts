import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-projetspersonnel',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    MatGridList,
    MatGridTile
  ],
  templateUrl: './projetspersonnel.component.html',
  styleUrl: './projetspersonnel.component.css'
})
export class ProjetspersonnelComponent {

}
