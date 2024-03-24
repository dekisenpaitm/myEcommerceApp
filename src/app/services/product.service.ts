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

  addToCart(cart:any):Observable<any>{
    return this.http.post<any>("http://onlinetestapi.gerasim.in/api/Ecomm/AddToCart", cart)
  }

  getCartItemsByCustomerId(custId:number):Observable<any[]>{
    return this.http.get<any[]>("http://onlinetestapi.gerasim.in/api/Ecomm/GetCartProductsByCustomerId?id="+ custId)
  }

  removeCartItemsById(itemId:number):Observable<any[]>{
    return this.http.get<any[]>("http://onlinetestapi.gerasim.in/api/Ecomm/DeleteProductFromCartById?id="+ itemId)
  }

  addNewSale(cart:any):Observable<any>{
    return this.http.post<any>("http://onlinetestapi.gerasim.in/api/Ecomm/AddNewSale", cart)
  }
}
