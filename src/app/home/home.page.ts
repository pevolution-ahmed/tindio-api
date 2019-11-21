import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';
import { debounceTime} from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{
  productlist: Product[] = [];
  private maximumPages =  10;
  private pageNumber = 0;
  private itemsPerPage = 24;
  private subscription: Subscription;
  constructor(private productRepo: ProductRepository) {    }
  ngOnInit(): void {
    this.getData();
  }

  getData(event?){
    this.subscription = this.productRepo.getProducts(this.itemsPerPage, this.pageNumber).subscribe((data: any) =>{
      this.productlist = this.productlist.concat(data.list);
      if(event){
      event.target.complete();
      }
    });
  }
  loadData(event){
    this.pageNumber++;
    this.getData(event);
    if(this.pageNumber === this.maximumPages){
      event.target.disabled = true;
    }

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
