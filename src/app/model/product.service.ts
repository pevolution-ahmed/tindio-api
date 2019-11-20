import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Product } from './product.model';
import { HttpClient} from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { HTTP} from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient,private nativeClient: HTTP) { }
  getProducts(itemsPerPage: number = 24 , page: number = 0): Observable<Product[]> {
    // const url = 'https://api.example.com';
    // const params = {};
    // const headers = {};

    // const response = from(this.nativeClient.get(url, params, headers));

    // console.log(response.subscribe(data=>console.log(data)));
    return this.httpClient.get<Product[]>(`http://tindiostag.tindio.com/api/home?items_per_page=${itemsPerPage}&page=${page})`);
  }
}
