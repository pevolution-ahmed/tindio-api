import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';
import {  Subscription } from 'rxjs';
import { Platform} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{
  productlist: Product[] = [];
  private maximumPages ;
  private pageNumber = 0;
  private itemsPerPage = 24;
  private subscription: Subscription;
  private loggedInUser;
  constructor(private productRepo: ProductRepository, private plateform: Platform) {    }
  ngOnInit(): void {
    this.getData();
    this.loggedInUser = history.state.userData;
    console.log('loggeIn',history.state.userData);
    
  }

  async getData(event?){
    if(this.plateform.is('cordova')){
      console.log('In Android!!');
      const data = await this.productRepo.getProducts(this.itemsPerPage, this.pageNumber);
      this.productlist = JSON.parse(data.data).list;
      this.maximumPages = JSON.parse(data.data).pager.limit;
      console.log('Data IN Android',this.productlist,'another',JSON.parse(data.data));
      if(event){
        event.target.complete();
      }
      return;
    }
    console.log('In Web!!');

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
      this.pageNumber = 0;
    }

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
