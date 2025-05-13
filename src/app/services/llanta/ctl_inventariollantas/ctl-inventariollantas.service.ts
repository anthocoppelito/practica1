import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventarioLlantas } from './inventariollantas';
import { environment } from '../../../../assets/environments/environment';
import { InventarioLlantasDTO } from './inventariollantasDTO';

@Injectable({
  providedIn: 'root'
})
export class CtlInventariollantasService {

  constructor(private http: HttpClient) { }

  //getAllInventarioLlanta
  getAllInventarioLlanta(): Observable<InventarioLlantas[]> {
    return this.http.get<InventarioLlantas[]>(environment.urlApi2 + "inventariollantas/all");
  }

  //registrar inventario llantas
  register(inventario: InventarioLlantasDTO): Observable<String> {
    return this.http.post(environment.urlApi2 + "inventariollantas/register", inventario, { responseType: 'text' });
  }
}
