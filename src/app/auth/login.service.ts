import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{

  private currentUser: firebase.User = null;
  constructor(private route: Router,private angularFireAuth: AngularFireAuth) { }

  ngOnInit(): void {

  }
   loginWith(provider){
      try{
      this.getLoggeingState().subscribe((user) => {
        this.currentUser = user;
        if(this.currentUser === null){
          this.angularFireAuth.auth.signInWithRedirect(provider);
        } else{
          this.route.navigateByUrl('/home');
        }
      },(err)=>{
        throw new Error('Error in logging in ').stack;
      });
    } catch(err){
      console.log(err);
    }
  }
  getLoggeingState(){
    return this.angularFireAuth.authState;
  }
}
