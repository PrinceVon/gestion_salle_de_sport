import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${user.id}`, user);
  }
  
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${localStorage.getItem("username")}`);
  }
  
  
  
  changePassword(username: string, oldPassword: string,   newPassword: string): Observable<string> {
  
    const body = { username, oldPassword, newPassword };
  
    return this.http.put<string>(`${this.apiUrl}/change-password`, body);
  }
  
}
