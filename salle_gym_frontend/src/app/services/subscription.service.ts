import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:8080/api/subscriptions';

  constructor(private http: HttpClient) {}

  subscribeCustomer(customerId: number, packId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${customerId}/${packId}`, {});

    }

    getAllSubscriptions(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}`);
    }
  
    cancelSubscription(subscriptionId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${subscriptionId}`);
    }
}

