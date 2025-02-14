import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customers',
  standalone: false,
  templateUrl: './add-customers.component.html',
  styleUrl: './add-customers.component.css'
})

export class AddCustomersComponent {
  customer: any = {
    lastName: '',
    firstName: '',
    phoneNumber: '',
    registrationDate: ''
  };

  constructor(private customerService: CustomerService, private router: Router) {}

  addCustomer(): void {
    this.customerService.addCustomer(this.customer).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Client ajouté avec succès !',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate([`/clients/liste`]);
        });
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du client', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Un client a déjà ce numéro, veuillez donner un numéro différent.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  cancel(): void {
    const username = localStorage.getItem("username");
    this.router.navigate([`/dashboard-gerant/${username}`]);
  }
}
