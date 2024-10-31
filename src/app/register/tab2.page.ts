import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

export class Tab2Page {
  showPassword = false;
  password: string = '';
  email: string = '';
  tipoerror: any = '';

  constructor(
    public auth: AuthenticationService,
    public router: Router,
    private toastController: ToastController
  ) {}

  /**
   * @function register
   * @description Realiza el registro del usuario con el correo y la contraseña ingresados.
   * Si es exitoso, muestra un mensaje y redirige a la página de inicio de sesión; en caso de error, muestra un mensaje de error.
   */
  async register() {
    this.auth
      .signUp(this.email, this.password)
      .then((userCredential) => {
        this.presentToast();

        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      })
      .catch((error: any) => {
        console.log(error.code);
        this.tipoerror = error.code;
        this.ErrorToast(this.tipoerror);
      });
  }

  /**
   * @function backToLogin
   * @description Navega de regreso a la página de inicio de sesión.
   */
  backToLogin() {
    this.router.navigate(['login']);
  }

  /**
   * @function presentToast
   * @description Muestra un mensaje de confirmación al usuario tras un registro exitoso.
   */
  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Registro exitoso',
      message: 'Bienvenido.',
      duration: 4500,
      position: 'top', 
      buttons: [
        {
          icon: 'close',
          role: 'cancel', 
        },
      ],
    });
    toast.present(); 
  }

  /**
   * @function ErrorToast
   * @description Muestra un mensaje de error en caso de fallo durante el registro, dependiendo del tipo de error.
   * @param {any} tipoerror - Código de error recibido durante el proceso de registro.
   */
  async ErrorToast(tipoerror: any) {
    let message = 'Registro fallido';

    if (tipoerror === 'auth/invalid-email') {
      message = 'Correo electrónico inválido.';
    } else if (tipoerror === 'auth/email-already-in-use') {
      message = 'El correo electrónico ya está registrado.';
    } else if (tipoerror === 'auth/weak-password') {
      message = 'La contraseña debe tener mínimo 6 caracteres.';
    } else {
      message = 'Error en el registro, verifique los datos: ';
    }

    const toast = await this.toastController.create({
      header: 'Registro fallido',
      message: message,
      duration: 4500,
      position: 'top', 
      buttons: [
        {
          icon: 'close',
          role: 'cancel', 
        },
      ],
    });
    toast.present(); 
  }
}

