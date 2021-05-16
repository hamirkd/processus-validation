import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'api/users';

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  add(user:any): Observable<any> {
    return this.http.post(this.baseUrl,user);
  }
  
}
