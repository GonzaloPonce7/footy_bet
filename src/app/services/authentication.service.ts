import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, User } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  tabnuevo: boolean = false;
  private auth = getAuth();
  private provider = new GoogleAuthProvider();

  constructor() {
    // Define el alcance de la API de Google para el proveedor de autenticación
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }

  /**
   * @method logIn
   * @description Inicia sesión con email y contraseña.
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Promise<UserCredential>} - Devuelve las credenciales del usuario al iniciar sesión.
   */
  async logIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * @method logInGoogle
   * @description Inicia sesión con Google utilizando un popup.
   * @returns {Promise<UserCredential>} - Devuelve las credenciales del usuario autenticado con Google.
   */
  async logInGoogle() {
    return signInWithPopup(this.auth, this.provider);
  }

  /**
   * @method logOut
   * @description Cierra la sesión del usuario actual.
   * @returns {Promise<void>} - Retorna una promesa resuelta al cerrar sesión.
   */
  async logOut() {
    return signOut(this.auth);
  }

  /**
   * @method signUp
   * @description Registra un nuevo usuario con email y contraseña.
   * @param {string} email - Correo electrónico del nuevo usuario.
   * @param {string} password - Contraseña del nuevo usuario.
   * @returns {Promise<UserCredential>} - Devuelve las credenciales del usuario registrado.
   */
  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * @method resetPassword
   * @description Envía un correo electrónico para restablecer la contraseña.
   * @param {string} email - Correo electrónico del usuario que desea restablecer su contraseña.
   * @returns {Promise<void>} - Retorna una promesa resuelta si el correo de restablecimiento es enviado con éxito.
   */
  async resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  /**
   * @method getCurrentUser
   * @description Obtiene el usuario actualmente autenticado.
   * @returns {Promise<User | null>} - Devuelve el usuario autenticado o `null` si no hay sesión activa.
   */
  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(user as User);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
}