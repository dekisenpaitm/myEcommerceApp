import { ProductService } from 'src/app/services/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent {

cartProducts:any[]=[];
subTotal:number = 0;
saleObj:any ={
  "SaleId":0,
  "CustId":1,
  "SaleDate":new Date(),
  "TotalInvoiceAmount":0,
  "Discount":0,
  "PaymentNaration":"Patm",
  "DeliverAdress1":"Plot no 1",
  "DeliverAdress2":"ner ATM",
  "DeliveryCity":"Pune",
  "DeliveryPinCode":"440033",
  "DeliveryLandMark":"ATM"
}

  constructor(private productService:ProductService){
    this.loadCart();
  }

  loadCart(){
    this.subTotal=0;
    this.productService.getCartItemsByCustomerId(1).subscribe((res:any)=>{
      this.cartProducts = res.data;
      this.cartProducts.forEach(element =>{
        this.subTotal = this.subTotal + element.productPrice;
      })
    })
  }

  removeItem(cartId:number){
    this.productService.removeCartItemsById(cartId).subscribe((res:any)=>{
      if(res.result){
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    })
  }

  makeSale(){
    this.saleObj.TotalInvoiceAmount = this.subTotal;
    this.productService.cartAddedSubject.next(true);
    this.productService.addNewSale(this.saleObj).subscribe((res:any)=>{
      if(res.result){
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
        alert("Thank you for your purchase!")
      }
    })
  }

}
