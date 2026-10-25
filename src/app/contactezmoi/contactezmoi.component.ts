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
  showEmailFallback = false;

  get fallbackEmailUrl(): string {
    const subject = encodeURIComponent('Contact depuis le portfolio');
    const body = encodeURIComponent(`${this.value3}\n\nAdresse de réponse : ${this.value2}\nTéléphone : ${this.value1}`);
    return `mailto:moilechevallier@gmail.com?subject=${subject}&body=${body}`;
  }

  constructor(private http: HttpClient) {}

  private readonly apiUrl = '/api/sendmail';

  sendRequest() {
    this.statusMessage = '';
    this.showEmailFallback = false;
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
          this.statusMessage = 'Le formulaire est momentanément indisponible. Votre message est conservé ci-dessus.';
          this.showEmailFallback = true;
        }
      });
  }
}
