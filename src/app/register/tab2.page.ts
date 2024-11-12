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
  showPassword: boolean = false;
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  validLength: boolean = false;
  validUppercase: boolean = false;
  validSpecialChar: boolean = false;

  constructor(
    public auth: AuthenticationService,
    public router: Router,
    private toastController: ToastController
  ) {}
  /**
   * @function validatePassword
   * @description Condiciones para contraseña:mayor o igual a 8 caracteres,al menos una mayuscula y un signo.
   */
  validatePassword() {
    this.validLength = this.password.length >= 8;
    this.validUppercase = /[A-Z]/.test(this.password);
    this.validSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
  }
  /**
   * @function register
   * @description Realiza el registro del usuario con el correo y la contraseña ingresados.
   * Si es exitoso, muestra un mensaje y redirige a la página de inicio de sesión; en caso de error, muestra un mensaje de error.
   */
  async register() {
    if (this.password !== this.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden.');
      return;
    }
    if (!this.validLength || !this.validUppercase || !this.validSpecialChar) {
      this.presentToast('La contraseña no cumple con los requisitos.');
      return;
    }

    this.auth
      .signUp(this.email, this.password)
      .then((userCredential: any) => {
        this.presentToast('Registro exitoso');
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      })
      .catch((error: any) => {
        console.log(error.code);
        this.ErrorToast(error.code);
      });
  }
   /**
   * @function presentToast
   * @description Muestra un mensaje de confirmación al usuario tras un registro exitoso.
   */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
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
   /**
   * @function backToLogin
   * @description Navega de regreso a la página de inicio de sesión.
   */ 
  backToLogin() {
    this.router.navigate(['login']);
  }
}
