import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from './angular-material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RoomComponent } from './room/room.component';
import { RegisterComponent } from './register/register.component';
import { SpotifyConnectComponent } from './spotify/spotify-connect.component';
import { UserPageComponent } from './user-page/user-page.component';

import { AuthenticationService } from './services/authentication.service';
import { SpotifyService } from './services/spotify.service';
import { RoomCreateDialogComponent } from './user-page/room-create-dialog/room-create-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RoomComponent,
    RegisterComponent,
    SpotifyConnectComponent,
    UserPageComponent,
    RoomCreateDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    SpotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
