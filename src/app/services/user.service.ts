import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // POST /api/users
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  uploadPhoto(id: number, file: File): Observable<void> {
    const form = new FormData(); form.append('file', file);
    return this.http.post<void>(`${this.apiUrl}/${id}/photo`, form);
  }
  getPhotoUrl(id: number): Observable<{url: string}> {
    return this.http.get<{url: string}>(`${this.apiUrl}/${id}/photo`);
  }
  deletePhoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/photo`);
  }

  // GET /api/users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
