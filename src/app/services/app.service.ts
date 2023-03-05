import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/address.model';

@Injectable()
export class AppService {
  private url: string = 'https://viacep.com.br/ws/30160907/json/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getAddress(): Observable<Address> {
    return this.http.get<Address>(this.url).pipe(
      (res) => res,
      (error) => error
    );
  }

  public postAdress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.url, address, this.httpOptions);
  }
}
