import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  

  searchCustomers(name: string): Observable<any[]> {
    const url = `${this.apiUrl}/search?name=${encodeURIComponent(name)}`;
    return this.http.get<any[]>(url);
  }

  
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCustomer(id: number, customerData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, customerData);
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addCustomer(customerData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customerData);
  }

  getCustomersWithoutSubscription(): Observable<any[]> {
    return this.getClients().pipe(
      map(customers => customers.filter(c => !c.activeSubscription))
    );
  }






}

  







