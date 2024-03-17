import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-competence',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatExpansionPanelHeader,
    MatExpansionModule,
  ],
  templateUrl: './competence.component.html',
  styleUrl: './competence.component.css'
})
export class CompetenceComponent {

}
