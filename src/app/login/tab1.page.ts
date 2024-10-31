import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { map, take } from 'rxjs/operators';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  showPassword = false;
  password: string = '';
  email: string = '';
  tipoerrorlogin: any = '';
  iconName: string = 'eye-outline';

  constructor(
    public auth: AuthenticationService,
    public router: Router,
    private toastController: ToastController,
    private angularFireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    console.log("inicia el login");
    
    this.angularFireAuth.authState.pipe(
      take(1),
      map(user => {
        console.log("Aca viene el user " + user);
        if (user) {
          console.log("hay usuario");
          this.router.navigate(['/home']);
          return true;
        } else {
          console.log("no hay usuario");
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.iconName = this.showPassword ? 'eye-off-outline' : 'eye-outline';
  }
  /**
   * @function loginUser
   * @description Inicia sesión con correo y contraseña. 
   * Si es exitoso, redirige a la página principal; en caso de error, muestra un mensaje de error.
   */
  async loginUser() {
    this.auth.logIn(this.email, this.password).then((userCredential) => {
      this.router.navigate(['/home']);
    }).catch((error: any) => {
      console.log(error.code);
      this.tipoerrorlogin = error.code;
      this.ErrorToastlogin(this.tipoerrorlogin);
    });
  }

  /**
   * @function loginGoogle
   * @description Inicia sesión con Google y redirige a la página principal si es exitoso.
   * Muestra una alerta en caso de error de autenticación.
   */
  async loginGoogle() {
    this.auth.logInGoogle().then((userCredential) => {
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.log(error.code);
      alert('Google Error.');
    });
  }

  /**
   * @function register
   * @description Navega a la página de registro de cuenta.
   */
  register() {
    this.router.navigate(['crearcuenta']);
  }

  /**
   * @function ErrorToastlogin
   * @description Muestra un mensaje de error al usuario cuando el inicio de sesión falla.
   * @param {any} tipoerror - Código del error recibido durante el inicio de sesión.
   */
  async ErrorToastlogin(tipoerror: any) {
    let message = 'Contraseña o correo electrónico inválidos';

    const toast = await this.toastController.create({
      header: 'Registro fallido',
      message: message,
      duration: 4500,
      position: 'top',
      buttons: [
        {
          icon: 'close',
          role: 'cancel', 
        }
      ]
    });
    toast.present();
  }

  /**
   * @function VolverAtras
   * @description Redirige al usuario a la página principal.
   */
  VolverAtras() {
    this.router.navigate(['/home']);
  }
}