import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ModelModule } from './model/model.module';
import { HTTP } from '@ionic-native/http/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {} from '../environments'
const firebaseConfig = {
  apiKey: 'AIzaSyBp4B_edoDHinF9zIjPqBuIgj5LCwdlZ8Q',
  authDomain: 'tindio.firebaseapp.com',
  databaseURL: 'https://tindio.firebaseio.com',
  projectId: 'tindio',
  storageBucket: 'tindio.appspot.com',
  messagingSenderId: '892307557794',
  appId: '1:892307557794:web:7ac164baccafee98b9b6fb',
  measurementId: 'G-806WEPRSJH'
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ModelModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
