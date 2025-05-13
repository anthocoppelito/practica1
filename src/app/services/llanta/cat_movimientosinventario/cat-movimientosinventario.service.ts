import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../assets/environments/environment';
import { CatMovimientosinventario } from './catmovimientosinventario';
import { CatMovimientosinventarioDTO } from './catmovimientosinventarioDTO';

@Injectable({
  providedIn: 'root'
})
export class CatMovimientosinventarioService {

  constructor(private http: HttpClient) { }

  //getAllMovimientosInventario
  getAllMovimientosInventario(): Observable<CatMovimientosinventario[]> {
    return this.http.get<CatMovimientosinventario[]>(environment.urlApi2 + "movimientosinventario/all");
  }

  //registrar movimientos inventario
  register(movimiento: CatMovimientosinventarioDTO): Observable<String> {
    return this.http.post(environment.urlApi2 + "movimientosinventario/register", movimiento, { responseType: 'text' });
  }

}
