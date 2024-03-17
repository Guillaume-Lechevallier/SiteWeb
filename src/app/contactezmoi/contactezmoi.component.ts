import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton} from "@angular/material/button";
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-contactezmoi',
  standalone: true,
  imports: [
    MatFormField, FormsModule, MatFormFieldModule, MatInputModule, MatButton,HttpClientModule, FormsModule, MatInputModule
  ],
  templateUrl: './contactezmoi.component.html',
  styleUrl: './contactezmoi.component.css'
})

export class ContactezmoiComponent {
  value1:string ="";
  value2:string ="";
  value3:string ="";
  newvalue3:string ="";
  textebouton : string = "Envoyer";
  constructor(private http: HttpClient) {}

  sendRequest() {
    this.newvalue3 = btoa(this.value3);
    const headers = new HttpHeaders({
      'phone': this.value1,
      'contenu': this.newvalue3,
      'mail': this.value2,

    });


    this.http.get('https://guillaumelechevallier.pythonanywhere.com/sendmail', { headers: headers })
      .subscribe( {
        next: (response: any ) => {
          response = JSON.stringify(response);
          response = JSON.parse(response).response;
          console.log(response);
          this.textebouton = response;

          if (response != "Envoyé !"){

          } else {
            this.value1 = "";
            this.value2 = "";
            this.value3 = "";
          }

          // Change le texte une fois la requête complétée
        },
        error: (error: any) => {
        console.error(error);
        this.textebouton = 'Erreur'; // Optionnel: change le texte en cas d'erreur
      },

      });

  }


}
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
