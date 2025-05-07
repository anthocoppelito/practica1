import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../assets/environments/environment';
import { Sale } from './sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  //se importa HttpCliente al servicio
  constructor(private http:HttpClient) { }

  //getAllSales
  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(environment.urlApi+"sales/cajero/all");
  }

  //getSaleById
  getSaleById(saleid: number): Observable<Sale> {
    return this.http.get<Sale>(environment.urlApi+"sales/cajero/sale/"+saleid);
  }
}
