import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomComponent } from './room/room.component';
import { DatabaseCallService } from './services/database-call.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalContent } from './room/room.component';
import { AngularFireModule } from '@angular/fire/compat';
import { ModalDeviceComponent } from './room/modalDevice.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    NavBarComponent,
    NgbModalContent,
    ModalDeviceComponent,
    LoginComponent,
    MainComponent,
    SignUpComponent
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signUp',
        component: SignUpComponent
      },
      {
        path:  '**',
        pathMatch: 'full',
        redirectTo: '/main'
      }
    ]),
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    NgbModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [DatabaseCallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
