import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { FormUserComponent } from './pages/form-user/form-user.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'user/:idUser', component: UserComponent},
    {path: 'newuser', component: FormUserComponent},
    {path: 'updateuser/:idUser', component: FormUserComponent},
    {path: '**', redirectTo: 'home'}
];
