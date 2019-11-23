import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';
import {  Subscription } from 'rxjs';
import { Platform, LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../auth/login.service';

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
  loggedInUser;
  public loader: any;
  constructor(
    private productRepo: ProductRepository,
    private plateform: Platform,
    private lgService: LoginService,
    public route: Router ,
    public loadingCtrl: LoadingController
    ) {    }
  ngOnInit(): void {
    this.showLoader().then(()=>{
      this.lgService.getLoggeingState().subscribe((user)=>{
        this.loggedInUser = user;
        console.log(this.loggedInUser);
        
        if (!user) {
          this.loader.dismiss();
          this.route.navigateByUrl('/login');
        }
        this.getData();
        this.loader.dismiss();

      });
    });
    
  }
async showLoader() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...',
      cssClass: 'custom-loader-class',
      showBackdrop: true,
      spinner: 'circular'
    });
    this.loader.present();
}
  async getData(event?){

    if(this.plateform.is('cordova')){
      const data = await this.productRepo.getProducts(this.itemsPerPage, this.pageNumber);

      this.productlist = JSON.parse(data.data).list;
      this.maximumPages = JSON.parse(data.data).pager.limit;
      if(event){
        event.target.complete();
      }
      return;
    }
    this.subscription = this.productRepo.getProducts(this.itemsPerPage, this.pageNumber).subscribe((data: any) =>{
      this.productlist = this.productlist.concat(data.list);
      this.loader.dismiss();

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
