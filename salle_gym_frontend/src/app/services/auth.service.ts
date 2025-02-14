import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}


  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, { username, password });
  }

  existToken(): boolean{
    return (localStorage.getItem("token") != null);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${username}`);
  }



  changePassword(username: string, oldPassword: string,   newPassword: string): Observable<string> {
  
    const body = { username, oldPassword, newPassword };
  
    return this.http.put<string>(`${this.apiURL}/change-password`, body);
  }
  

  
}
