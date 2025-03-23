import { Component, inject,Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

@Input() idUser: string = '';
@Input() theUser: IUser | any 
usersServices= inject(UsersService);






async ngOnInit() {
  let _id = this.idUser;
  try{
    this.theUser = await this.usersServices.getById(_id);
  } catch (error) {
    console.log(error);
  }
}

deleteUser(_id: string) {
  toast.error(`Deseas borrar al usuario ${this.theUser?.first_name}?`, 
    {
    action: {
      label: 'Aceptar',
      onClick: async () => {
        
        try{
          let response= await this.usersServices.delete(_id)
          window.location.href= '/users';
          console.log('Usuario eliminado', response);
        }catch (error) {
          console.log('Error al eliminar el usuario', error)
        }
      }
    }
  });
  
}

}
