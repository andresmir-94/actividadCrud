import { Component, inject, Input } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  imports: [ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {

  @Input() idUser: string = '';

  userForm: FormGroup = new FormGroup({}, []);
  userService = inject(UsersService);
  user!: IUser;
  title: string = 'Registrar';
  router = inject(Router);

  async ngOnInit() {
    try {
      if (this.idUser) {
        this.user = await this.userService.getById(this.idUser);
        this.title = 'Actualizar';
      }
    } catch (error: any) {
      console.error("Error recibido de la API:", error);
      toast.error('Error al obtener los datos del usuario.');
    }

    this.userForm = new FormGroup({
      _id: new FormControl(this.user?._id || null, []),
      nombreUsuario: new FormControl(this.user?.first_name || "", [Validators.required,
        Validators.minLength(3)]),
      apellidosUsuario: new FormControl(this.user?.last_name || "", [Validators.required]),
      emailUsuario: new FormControl(this.user?.email || "", [Validators.required,
        Validators.pattern(/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/)]),
      imagenUsuario: new FormControl(this.user?.image || "", [Validators.required]),
    }, []);
  }

  async getDataForm() {
    if (this.userForm.invalid) {
      toast.error('Por favor, completa correctamente todos los campos del formulario.');
      return;
    }

    let response: IUser | any;
    try {
      if (this.userForm.value._id) {
        response = await this.userService.update(this.userForm.value);
      } else {
        response = await this.userService.insert(this.userForm.value);
      }

      if (response && response.error) {
        console.error(response.error);
        toast.error('Ocurrió un error al procesar la solicitud.');
      } else {
        console.log("Operación exitosa:", response);
        toast.success('Operación realizada con éxito.');
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error('Error en la solicitud. Inténtalo de nuevo.');
    }
  }
}
