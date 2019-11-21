import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { ProductService} from './product.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductRepository {
  private products: Product[] ;
  constructor(private service: ProductService ){ }

  getProducts(itemsPerPage: number = 24, page: number = 0): Observable<Product[]> {
    return this.service.serveProducts(itemsPerPage,page);
  }

  getProduct(id: number): Product {
    return this.products.find(p => p.id == id );
  }


}
