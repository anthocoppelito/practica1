import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marcas } from './marcas';
import { environment } from '../../../../assets/environments/environment';
import { MarcasDTO } from './marcasDTO';

@Injectable({
  providedIn: 'root'
})
export class CatMarcasService {

  constructor(private http:HttpClient) { }

  //getAllMarcas
  getAllMarcas(): Observable<Marcas[]> {
    return this.http.get<Marcas[]>(environment.urlApi2+"marcas/all");
  }

  //registrar marcas
  register(marca: MarcasDTO): Observable<String> {
    return this.http.post(environment.urlApi2+"marcas/register", marca, { responseType: 'text' });
  }
  //editar marcas
  edit(idMarca: number, nomMarcas: string): Observable<String> {
    return this.http.put(environment.urlApi2+"marcas/edit", {idMarca,nomMarcas}, { responseType: 'text' });
  }
  //eliminar marcas
  delete(idMarca: number): Observable<String> {
    return this.http.put(environment.urlApi2+"marcas/delete" , {idMarca}, { responseType: 'text' });
  }
}
