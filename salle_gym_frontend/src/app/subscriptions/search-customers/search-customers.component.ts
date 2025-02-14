import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-customers',
  standalone: false,
  templateUrl: './search-customers.component.html',
  styleUrl: './search-customers.component.css'
})
export class SearchCustomersComponent implements OnInit {
  searchQuery: string = '';
  customers: any[] = [];
  allCustomers: any[] = [];

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomersWithoutSubscription().subscribe(data => {
      this.allCustomers = data;
      this.customers = data;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim() !== '') {
      this.customers = this.allCustomers.filter(customer =>
        (customer.lastName + ' ' + customer.firstName)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.customers = [...this.allCustomers]; 
    }
  }

  subscribe(customerId: number): void {
    this.router.navigate(['/subscriptions/choose-pack', customerId]);
  }

}








