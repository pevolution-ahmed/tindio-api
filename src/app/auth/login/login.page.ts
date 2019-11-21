import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  currentUser: firebase.User;

  constructor( private service: LoginService,private route: Router) { }

  ngOnInit() {
    this.service.getLoggeingState().subscribe((user)=>{
      if(user){
        this.route.navigateByUrl('/home');
      }
      console.log(user);
    });
  }
  loginWithGoogle(){
    this.service.loginWith(new auth.GoogleAuthProvider());
  }
  loginWithFacebook(){
    this.service.loginWith(new auth.FacebookAuthProvider());

  }

}
