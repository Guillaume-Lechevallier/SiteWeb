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
  textebouton = 'Envoyer';
  statusMessage = '';

  constructor(private http: HttpClient) {}

  private get apiUrl(): string {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://127.0.0.1:5000/sendmail'
      : 'https://guillaumelechevallier.pythonanywhere.com/sendmail';
  }

  sendRequest() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      phone: this.value1 ?? '',
      message: this.value3 ?? '',
      email: this.value2 ?? ''
    };

    this.http
      .post(this.apiUrl, body, { headers })
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
