import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { RegisterComponent } from './register/register.component';
import { UserPageComponent } from './user-page/user-page.component';

import { UserLoginService } from './services/user-login.service';

const routes: Routes = [
  { path: '', component: HomeComponent, data: {/*animation: 'Home'*/} },
  { path: 'login', component: LoginComponent, data: {/*animation: 'Login'*/}},
  { path: 'room/:code', component: RoomComponent, data: {/*animation: 'Room'*/}},
  { path: 'register', component: RegisterComponent, data: {/*animation: 'Register'*/}},
  { path: 'user', component: UserPageComponent, data: {}, canActivate: [UserLoginService]},
  { path: 'spotify/auth/redirect', component: UserPageComponent, data: {code: String} },
  { path: '**', redirectTo: '', data: {}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
