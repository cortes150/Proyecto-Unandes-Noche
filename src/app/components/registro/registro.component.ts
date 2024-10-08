import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  name: string = '';
  surname: string = '';
  ci: string = '';
  email: string = '';
  password: string = '';
  errorMensaje: string = '';
  rol: string = 'cliente';
  constructor(private authService: AuthService, private router: Router) {}
  registrar() {
    this.authService
      .registro(
        this.name,
        this.surname,
        this.ci,
        this.email,
        this.password,
        this.rol
      )
      .then(() => {
        this.router.navigate(['/bienvenida']);
      })
      .catch((error) => {
        this.errorMensaje = error.message;
      });
  }
}
