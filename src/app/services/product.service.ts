import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cart } from '../shared/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public cartAddedSubject = new Subject<boolean>();

  constructor(private http:HttpClient) {
   }

  //creates a fetch of data in an array of ANY type

  getAllProducts():Observable<any[]>{
    return this.http.get<any[]>("http://onlinetestapi.gerasim.in/api/Ecomm/GetAllProducts")
  }

  addToCart(cart:Cart):Observable<Cart>{
    return this.http.post<Cart>("http://onlinetestapi.gerasim.in/api/Ecomm/AddToCart", cart)
  }
}
