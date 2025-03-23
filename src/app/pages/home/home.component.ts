import { Component, inject,  } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';

import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

arrUsersObservable: IUser[] = [];
usersServices= inject(UsersService);  
pageOne: number = 1;
pageTwo: number = 2;
pageHome: number = this.pageOne;

ngOnInit(){
this.loadPage(this.pageOne)
}

loadPage = (page:number) => {
  this.usersServices.getAllObservable(page).subscribe({
  next: (response) => {
  this.pageHome= page
    this.arrUsersObservable = response.results;
    console.log(this.arrUsersObservable);
  },
  error: (error) => {console.log(error);}
})
}
}