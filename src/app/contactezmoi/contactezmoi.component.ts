import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contactezmoi',
  standalone: true,
  imports: [FormsModule, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule, HttpClientModule],
  templateUrl: './contactezmoi.component.html',
  styleUrl: './contactezmoi.component.css'
})
export class ContactezmoiComponent {
  value1 = '';
  value2 = '';
  value3 = '';
  newvalue3 = '';
  textebouton = 'Envoyer';
  statusMessage = '';

  constructor(private http: HttpClient) {}

  sendRequest() {
    this.newvalue3 = btoa(this.value3 ?? '');
    const headers = new HttpHeaders({
      phone: this.value1 ?? '',
      contenu: this.newvalue3 ?? '',
      mail: this.value2 ?? ''
    });

    this.http
      .get('https://guillaumelechevallier.pythonanywhere.com/sendmail', { headers })
      .subscribe({
        next: (response: any) => {
          response = JSON.stringify(response);
          response = JSON.parse(response).response;
          this.statusMessage = response;

          if (response === 'Envoyé !') {
            this.value1 = '';
            this.value2 = '';
            this.value3 = '';
          }
        },
        error: () => {
          this.statusMessage = 'Erreur';
        }
      });
  }
}
