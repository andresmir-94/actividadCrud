import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

@Input() miUser!: IUser
usersServices= inject(UsersService);


deleteUser(_id: string) {
  toast.error(`Deseas borrar al usuario ${this.miUser?.first_name}?`, 
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
