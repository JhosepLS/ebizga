import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],  // <- Agregar imports
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.usuario && this.password) {
      this.authService.login(this.usuario, this.password).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/home']);
          } else {
            this.showErrorAlert('Usuario o contraseña incorrectos');
          }
        },
        error => {
          this.showErrorAlert('Error al iniciar sesión');
        }
      );
    } else {
      this.showErrorAlert('Por favor complete todos los campos');
    }
  }

  showErrorAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  closeAlert() {
    this.showAlert = false;
  }
}