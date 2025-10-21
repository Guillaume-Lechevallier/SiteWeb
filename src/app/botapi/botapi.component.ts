import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-botapi',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, HttpClientModule],
  templateUrl: './botapi.component.html',
  styleUrl: './botapi.component.css'
})
export class BotapiComponent {
  message = '';
  textebouton = 'Envoyer';
  retour = 'Retour du bot';
  botResponse = '';

  constructor(private http: HttpClient) {}

  sendRequest() {
    const headers = new HttpHeaders({
      message: this.message ?? '',
      instance: '48333609',
      application: '3358310012814659765'
    });

    this.http.get('https://www.botlibre.com/rest/json/chat', { headers }).subscribe({
      next: (response: any) => {
        response = JSON.stringify(response);
        response = JSON.parse(response).response;
        this.botResponse = response;
      },
      error: () => {
        this.botResponse = 'Erreur';
      }
    });
  }
}
