import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: {/*animation: 'Home'*/} },
  { path: 'login', component: LoginComponent, data: {/*animation: 'Login'*/}},
  { path: 'room/:id', component: RoomComponent, data: {/*animation: 'Room'*/}},
  { path: 'register', component: RegisterComponent, data: {/*animation: 'Register'*/}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
