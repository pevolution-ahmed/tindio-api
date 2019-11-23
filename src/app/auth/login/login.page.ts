import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

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
          this.route.navigateByUrl('/home');
          }
       });
    });
  }
  async loginWithGoogle() {
    try {
      this.showLoader();
      const userCred = await this.service.googleLogin();
      this.loader.dismiss();
      this.currentUser = userCred;
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
