import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventarioLlantas } from './inventariollantas';
import { environment } from '../../../../assets/environments/environment';
import { InventarioLlantasDTO } from './inventariollantasDTO';
import { InventarioLlantasEdit } from './inventariollantasEdit';

@Injectable({
  providedIn: 'root'
})
export class CtlInventariollantasService {

  getLlantasbySearch(busqueda: String): Observable<InventarioLlantas[]> {
    return this.http.get<InventarioLlantas[]>(environment.urlApi2 + "inventarioLlanta/search/" + busqueda);
  }


  constructor(private http: HttpClient) { }

  //getAllInventarioLlanta
  getAllInventarioLlanta(): Observable<InventarioLlantas[]> {
    return this.http.get<InventarioLlantas[]>(environment.urlApi2 + "inventarioLlanta/all");
  }

  //registrar inventario llantas
  register(inventario: InventarioLlantasDTO): Observable<String> {
    return this.http.post(environment.urlApi2 + "inventarioLlanta/register", inventario, { responseType: 'text' });
  }

  //editar inventario llantas
  edit(inventario: InventarioLlantasEdit): Observable<String> {
    return this.http.put(environment.urlApi2 + "inventarioLlanta/edit", inventario, { responseType: 'text' });
  }

  //eliminar inventario llantas
  delete(idLlanta: number): Observable<String> {
    return this.http.post(environment.urlApi2 + "inventarioLlanta/delete" , {idLlanta}, { responseType: 'text' });
  }

  //añadir stock
  addStock(idLlanta: number, numExistencia: number): Observable<String> {
    return this.http.put(environment.urlApi2 + "inventarioLlanta/addStock" , {idLlanta, numExistencia}, { responseType: 'text' });
  }

  //restar stock
  removeStock(idLlanta: number, numExistencia: number): Observable<String> {
    return this.http.put(environment.urlApi2 + "inventarioLlanta/removeStock" , {idLlanta, numExistencia}, { responseType: 'text' });
  }
}
