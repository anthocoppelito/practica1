import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from './product';
import { environment } from '../../../assets/environments/environment';
import { ProductRegister } from './productRegister';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

    //getAllProducts
    getAllProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(environment.urlApi+"product/bodega/all");
    }

    //verificar si producto existe
    checkProduct(productname:String):Observable<boolean>{
      return this.http.get<boolean>(environment.urlApi+"product/bodega/exists/"+productname).pipe(
        catchError(this.handleError) 
      )
    }
    //Handle error
    private handleError(error: HttpErrorResponse){
          if(error.status===0){
            console.error('Se ha producido un error ', error.error);
          }else{
            console.error('Backend regreso un codigo de estado ', error.status, error.error);
          }
          return throwError(()=> new Error('Algo fallo, intenta nuevamente'));
      
    }

    //registrar productos
    register(productRegister: ProductRegister): Observable<String> {
        return this.http.post(environment.urlApi+"product/bodega/register", productRegister, { responseType: 'text' }).pipe(
          catchError(this.handleError));
      }
}
