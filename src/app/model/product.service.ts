import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Product } from './product.model';
import { HttpClient} from '@angular/common/http';
import { HTTP} from '@ionic-native/http/ngx';
import { Platform} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient,private nativeClient: HTTP, private platform: Platform) { }


  serveProducts(itemsPerPage: number , page: number): any {
    if(this.platform.is('cordova')){
     const options = {
        method: 'get',
        headers: { Authorization: 'OAuth2: token' },
        params : {
          items_per_page : itemsPerPage.toString(),
          page : page.toString()
        }
            };
     return this.nativeClient.sendRequest('http://tindiostag.tindio.com/api/home', options);
    } else{
      return this.httpClient.get<Product[]>(`http://tindiostag.tindio.com/api/home?items_per_page=${itemsPerPage}&page=${page})`);
    }
  }
}
