import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  currentUser: firebase.User;
  loader: any;
  constructor(
    private service: LoginService,
    private route: Router,
    public loadingCtrl: LoadingController
    ) { }

   ngOnInit() {
    this.showLoader().then(()=>{
      this.service.getLoggeingState().subscribe((user)=>{
        console.log('show is done1');
        this.currentUser = user;
        this.loader.dismiss();
  
        if (this.currentUser) {
          console.log('show is done2');
  
          this.route.navigateByUrl('/home');
          }
  
          console.log('show is done3');
  
       });
    });
    console.log('show is done');
    
  }
  async loginWithGoogle() {
    try {
      this.showLoader();
      console.log('im here');
      const userCred = await this.service.googleLogin();
      this.loader.dismiss();

      this.currentUser = userCred;
      console.log('loader dismissed');

      this.route.navigate(['/home'], {
        state: {userData : this.currentUser}
      });

     } catch (err) {
      console.log(new Error(err).stack);
     }

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
/*---- Unfinished yet ----*/
  loginWithFacebook() {
    this.service.facebookLogin();
  }

}
