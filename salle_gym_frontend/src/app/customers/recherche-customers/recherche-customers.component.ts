import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recherche-customers',
  standalone: false,
  templateUrl: './recherche-customers.component.html',
  styleUrl: './recherche-customers.component.css'
})
export class RechercheCustomersComponent implements OnInit {
  searchTerm: string = '';
  customers: any[] = [];

  constructor(private customerService: CustomerService, private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getClients().subscribe((data) => {
      this.customers = data;
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.loadCustomers(); 
    } else {
      this.customerService.searchCustomers(this.searchTerm).subscribe((data) => {
        this.customers = data;
      });
    }
  }


  editClient(client: any): void {
    this.router.navigate(['/edit-client', client.id]); 
  }
  
  deleteClient(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce client ?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.customers = this.customers.filter(client => client.id !== id);
      });
    }
  }
  

}










