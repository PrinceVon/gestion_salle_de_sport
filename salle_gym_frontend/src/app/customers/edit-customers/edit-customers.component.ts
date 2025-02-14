import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customers',
  standalone: false,
  templateUrl: './edit-customers.component.html',
  styleUrl: './edit-customers.component.css'
})
export class EditCustomersComponent implements OnInit {
  customer: any = {}; 
  customerId!: number;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du client', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de récupérer les informations du client.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  updateClient(): void {
    this.customerService.updateCustomer(this.customerId, this.customer).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Client mis à jour avec succès !',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/clients/liste']);
        });
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Numéro de téléphone déjà assigné.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  cancelEdit(): void {
    const username = localStorage.getItem("username");
    this.router.navigate([`/dashboard-gerant/${username}`]);
  }
}
