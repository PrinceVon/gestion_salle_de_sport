import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class PackService {
  private apiUrl = 'http://localhost:8080/api/packs';

  constructor(private http: HttpClient) {}

  getPacks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updatePack(id: number, packData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, packData);
  }

  deletePack(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}



