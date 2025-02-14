import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-offer',
  standalone: false,
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.css'
})
export class AddOfferComponent {
  apiUrl = 'http://localhost:8080/api/packs';
  message = '';
  
  offer = {
    offerName: '',
    durationMonths: 0,
    monthlyPrice: 0.0
  };

  constructor(private http: HttpClient) {}

  addOffer() {
    this.http.post(this.apiUrl, this.offer).subscribe({
      next: (response) => {
        this.message = "🎉 Offre ajoutée avec succès !";
        this.offer = { offerName: '', durationMonths: 0, monthlyPrice: 0.0 }; 
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout :", err);
        this.message = "❌ Pack déjà existant avec ce nom.";
      }
    });
  }
}

