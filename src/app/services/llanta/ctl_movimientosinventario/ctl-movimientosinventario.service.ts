import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CtlMovimientosinventario } from './ctlmovimientosinventario';
import { environment } from '../../../../assets/environments/environment';
import { CtlMovimientosinventarioDTO } from './ctlmovimientosinventarioDTO';

@Injectable({
  providedIn: 'root'
})
export class CtlMovimientosinventarioService {

  constructor(private http: HttpClient) { }

  //getAllMovimientosInventario
  getAllMovimientosInventario(): Observable<CtlMovimientosinventario[]> {
    return this.http.get<CtlMovimientosinventario[]>(environment.urlApi2 + "movimientosinventario/all");
  }

  //registrar movimientos inventario
  register(movimiento: CtlMovimientosinventarioDTO): Observable<String> {
    return this.http.post(environment.urlApi2 + "movimientosinventario/register", movimiento, { responseType: 'text' });
  }
}
