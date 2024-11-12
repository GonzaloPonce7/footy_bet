import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  /**
   * @function canActivate
   * @description Verifica si el usuario está autenticado para permitir o denegar el acceso a ciertas rutas.
   * Si el usuario está autenticado, permite el acceso retornando `true`; de lo contrario, redirige al login.
   * @returns {Observable<boolean>} Retorna `true` si el usuario está autenticado, de lo contrario `false`.
   */
  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1), 
      map(user => {
        console.log("Aca viene el user " + user);
        
        if (user) {
          return true; 
        } else {
          this.router.navigate(['login']); 
          return false;
        }
      })
    );
  }
}
