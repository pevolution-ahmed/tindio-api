import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  currentUser: firebase.User;

  constructor( private service: LoginService, private route: Router,private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.service.getLoggeingState().subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser){
        this.route.navigateByUrl('/home');
      }
      console.log(user);
    });
  }
  async loginWithGoogle(){
    try{
      const userCred = await this.service.googleLogin();
      this.currentUser = userCred.user;
      this.route.navigate(['/home'],{
        state:{userData : this.currentUser}
      });

     } catch (err) {
      console.log(new Error(err).stack); // done
     }


  }
  loginWithFacebook(){
    this.service.facebookLogin();

  }

}
