import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  productlist: Product[];
  maximumPages =  10;
  pageNumber = 0;
  itemsPerPage = 24;
  constructor(private productRepo: ProductRepository) {    }
  ngOnInit(): void {
    this.productRepo.getProducts().subscribe((data: any) =>{
      this.productlist = data.list;
    });
  }
  getData(event?){
    this.productRepo.getProducts(this.itemsPerPage,this.pageNumber).subscribe((data: any) =>{
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

}
