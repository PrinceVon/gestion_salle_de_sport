import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class DashboardService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getActiveClients(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/statistics/clients/actifs`);
  }

  getInactiveClients(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/statistics/clients/inactifs`);
  }
  

  getMonthlyRevenue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/statistics/revenu-mensuel`);
  }

  exportSubscriptions(startDate: string, endDate: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/statistics/export-abonnements?startDate=${startDate}&endDate=${endDate}`, { responseType: 'blob' });
  }


  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/update/${userId}`, userData);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/auth/delete/${userId}`);
  }

  changePassword(passwordData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/change-password`, passwordData);
  }
}
