import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-customers',
  standalone: false,
  templateUrl: './liste-customers.component.html',
  styleUrl: './liste-customers.component.css'
})
export class ListeCustomersComponent implements OnInit {
  clients: any[] = [];

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.customerService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  editClient(id: number): void {
    this.router.navigate(['/edit-client', id]);
  }

  deleteClient(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(id).subscribe({
          next: () => {
            this.clients = this.clients.filter(client => client.id !== id);
            Swal.fire(
              'Supprimé !',
              'Le client a été supprimé avec succès.',
              'success'
            );
          },
          error: (err) => {
            console.error("Erreur lors de la suppression :", err);
            Swal.fire(
              'Erreur',
              "Résilier d'abord son abonnement avant suppression.",
              'error'
            );
          }
        });
      }
    });
  }
}
