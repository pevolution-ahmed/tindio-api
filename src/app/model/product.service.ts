import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Product } from './product.model';
import { HttpClient} from '@angular/common/http';
import { HTTP} from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient,private nativeClient: HTTP) { }


  serveProducts(itemsPerPage: number , page: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`http://tindiostag.tindio.com/api/home?items_per_page=${itemsPerPage}&page=${page})`);
  }
}
