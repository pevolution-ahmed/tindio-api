import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GooglePlus} from '@ionic-native/google-plus/ngx';
import { Platform} from '@ionic/angular';
import { Observable } from 'rxjs';
import { auth } from 'firebase';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{

  private currentUser: firebase.User = null;
  user: Observable<firebase.User>;
  constructor(
    private route: Router,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus ,
    private platform: Platform ) { }

  ngOnInit(): void {
  }
  async googleLogin(){
    let authInfo;
    try {
      if (this.platform.is('cordova')){
            authInfo = await this.nativeGoogleLogin();
            return authInfo.user;
      } else {
        this.webLoginWith(new auth.GoogleAuthProvider());
      }
    } catch (err) {
      console.log(new Error(err).stack);
    }
  }
  facebookLogin(){
    if (this.platform.is('cordova')){
      this.nativeGoogleLogin();
    } else {
      this.webLoginWith(new auth.FacebookAuthProvider());
    }

  }
  async nativeGoogleLogin(): Promise<any> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': environment.webClientId
        });
      return this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));

    } catch (error) {
      console.log(new Error(error).stack);
    }
  }

   async webLoginWith(provider){
      try{
        this.getLoggeingState().subscribe((user)=>{
          this.currentUser = user;
          if (this.currentUser === null){
            this.afAuth.auth.signInWithRedirect(provider);
          } else{
            this.route.navigateByUrl('/home');
          }
        });
    } catch (err){
      console.log(new Error(err).stack);
    }
  }
  getLoggeingState(){
    return this.afAuth.authState;
  }
  logout(){
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')){
      this.gplus.logout();
    }
  }
}
