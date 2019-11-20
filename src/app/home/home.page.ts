import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';
import { fromEventPattern } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  productlist: Product[];
  constructor(private productRepo: ProductRepository) {
    this.productlist = productRepo.getProducts();
    console.log(this.productlist);
    
  }


}
