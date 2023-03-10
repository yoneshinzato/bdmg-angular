import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/address.model';

@Injectable()
export class AppService {
  private url: string = 'https://viacep.com.br/ws/30160907/json/';

  constructor(private http: HttpClient) { }

  public getAddress(): Observable<Address> {
    return this.http.get<Address>(this.url)
  }
}
