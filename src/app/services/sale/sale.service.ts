import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../assets/environments/environment';
import { Sale } from './sale';
import { RegisterSaleRequest } from './registerSaleRequest';
import { RegisterSaleLlantas } from './registerSaleLlantas';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  //se importa HttpCliente al servicio
  constructor(private http:HttpClient) { }

  //getAllSales
  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(environment.urlApi2+"sales/cajero/all");
  }

  //getSaleById
  getSaleById(saleid: number): Observable<Sale> {
    return this.http.get<Sale>(environment.urlApi2+"sales/cajero/sale/"+saleid);
  }

  //GetProductPriceByProductAmount - obtiene el precio unitario del producto y el total segun la cantidad
  getSalePriceByProductAmount(id: number, amount: number): Observable<{ unitPrice: number; totalPrice: number }> {
    return this.http.get<{ unitPrice: number; totalPrice: number }>(environment.urlApi2+"inventarioLlanta/price/"+id+"/"+amount);
  }

  //registrar venta - se envia una lista de productos y su cantidad
  registerSale(sale: RegisterSaleRequest): Observable<any> {
    return this.http.post(environment.urlApi+"sales/cajero/register", sale, { responseType: 'text' });
  }

  //registrar venta de llantas
  registerSaleLlantas(sale: RegisterSaleLlantas): Observable<any> {
    return this.http.post(environment.urlApi2+"sales/cajero/register", sale, { responseType: 'text' });
  }

  //servicio compartido:
  private saleRegisteredSource = new Subject<void>();
  saleRegistered$ = this.saleRegisteredSource.asObservable();

  notifySaleRegistered() {
    this.saleRegisteredSource.next();
  }



}
