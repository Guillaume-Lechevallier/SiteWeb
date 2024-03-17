import { Component } from '@angular/core';
import {ApropodemoiComponent} from "../apropodemoi/apropodemoi.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-experiencepro',
  standalone: true,
    imports: [
        ApropodemoiComponent,
        MatTab,
        MatTabGroup
    ],
  templateUrl: './experiencepro.component.html',
  styleUrl: './experiencepro.component.css'
})
export class ExperienceproComponent {

}
