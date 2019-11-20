import {Injectable} from '@angular/core';
import {Product} from './product.model';
import { ProductService} from './product.service';


@Injectable()
export class ProductRepository{
  private products: Product[] = [];

  constructor(private service: ProductService ){
    service.getProducts().subscribe(data =>{
      console.log("The DATA",data);
      
      this.products = data;
    });
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find(p => p.id == id );
  }


}
