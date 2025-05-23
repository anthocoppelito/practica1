import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelos } from './modelos';
import { environment } from '../../../../assets/environments/environment';
import { ModelosDTO } from './modelosDTO';

@Injectable({
  providedIn: 'root'
})
export class CatModelosService {

  constructor(private http:HttpClient) { }

  //getAllModels
  getAllModels(): Observable<Modelos[]> {
    return this.http.get<Modelos[]>(environment.urlApi2+"modelos/all");
  }

  //registrar modelos
  register(modelo: ModelosDTO): Observable<String> {
    return this.http.post(environment.urlApi2+"modelos/register", modelo, { responseType: 'text' });
  }
  //editar modelos
  edit(idModelo: number, nomModelos: string): Observable<String> {
    return this.http.put(environment.urlApi2+"modelos/edit", {idModelo,nomModelos}, { responseType: 'text' });
  }
  //eliminar modelos
  delete(idModelo: number): Observable<String> {
    return this.http.put(environment.urlApi2+"modelos/delete" , {idModelo}, { responseType: 'text' });
  }

}
