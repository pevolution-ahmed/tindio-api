import { Injectable } from '@angular/core';
import { ProductService} from './product.service';

@Injectable()
export class ProductRepository {
  constructor(private service: ProductService ){ }

  getProducts(itemsPerPage: number = 24, page: number = 0): any{
    return this.service.serveProducts(itemsPerPage,page);
  }

}
