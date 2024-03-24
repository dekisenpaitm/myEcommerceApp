import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from 'src/app/shared/cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
//to use OnInit we havve to use the "implements" keyword with the lifecycle hook we're looking for
export class HomeComponent implements OnInit{

productList:any[] = [];

cart!:Cart;

constructor(private productService:ProductService){
}

//we're adding the ngOnInit lifeCycleHook in here to fetch all the data upon initialization
//this could also be done in the constructor as well

ngOnInit(): void {
  this.loadAllProducts();
}


//we're injecting the service into the home component
//after that we are subscribing to it and returning the result as ANY type
//now we're packing our result.data into our productList


loadAllProducts(){
  this.productService.getAllProducts().subscribe((result:any)=>{
    this.productList = result.data;
  })
}

addItemToCart(productId:number){
  this.cart = new Cart()
  this.cart.CustId = 1;
  this.cart.ProductId = productId;
  console.log(this.cart);
  this.productService.addToCart(this.cart).subscribe((result:any)=>{
  this.productList = result.data;
  console.log(result.data)
  })
}

}
