import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton} from "@angular/material/button";
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-botapi',
  standalone: true,
  imports: [
    MatFormField, FormsModule, MatFormFieldModule, MatInputModule, MatButton,HttpClientModule, FormsModule, MatInputModule
  ],
  templateUrl: './botapi.component.html',
  styleUrl: './botapi.component.css'
})
export class BotapiComponent {

  message:string ="";
  textebouton : string = "Envoyer";
  retour: string = "Retour du bot"
  constructor(private http: HttpClient) {}

  sendRequest() {
    console.log(this.message)
    const headers = new HttpHeaders({
      'message': this.message,
      'instance':"48333609",
      'application':"3358310012814659765"
    });


    this.http.get('https://www.botlibre.com/rest/json/chat', { headers: headers })
      .subscribe( {
        next: (response: any ) => {
          response = JSON.stringify(response);
          response = JSON.parse(response).response;
          console.log(response);
          this.textebouton = response;

          if (response != "Envoyé !"){

          } else {
            this.message = "";
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
