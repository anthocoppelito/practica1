import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../assets/environments/environment';
import { Rines } from './rines';
import { RinesDTO } from './rinesDTO';

@Injectable({
  providedIn: 'root'
})
export class CatRinesService {

  constructor(private http: HttpClient) { }
  //getAllRines
  getAllRines(): Observable<Rines[]> {
    return this.http.get<Rines[]>(environment.urlApi2 + "rines/all");
  }

  //registrar rines
  register(rines: RinesDTO): Observable<String> {
    return this.http.post(environment.urlApi2 + "rines/register", rines, { responseType: 'text' });
  }

  //editar rines
  edit(idRin: number, nomRin: string): Observable<String> {
    return this.http.put(environment.urlApi2 + "rines/edit", { idRin, nomRin }, { responseType: 'text' });
  }
  //eliminar rines
  delete(idRin: number): Observable<String> {
    return this.http.put(environment.urlApi2 + "rines/delete", { idRin }, { responseType: 'text' });
  }
}
