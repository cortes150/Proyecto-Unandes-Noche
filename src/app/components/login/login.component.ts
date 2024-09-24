import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private router: Router, private authService: AuthService) {}
  goToRegister() {
    this.router.navigate(['/registro']);
  }
  login() {
    this.authService
      .login(this.email, this.password)
      .then((doc) => {
        doc.subscribe((infUsuario) => {
          if (infUsuario.exists) {
            const userD: any = infUsuario.data();
            if (userD.rol === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/bienvenida']);
            }
          }
        });
      })
      .catch((error) => {
        this.errorMsg = 'usuario o contraseña incorrectos';
        console.error('error durante el inicio: ', error);
      });
  }
}
