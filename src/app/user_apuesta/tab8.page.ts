import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { ApuestasService } from '../services/apuestas.service';
import { Apuestas } from '../models/apuestas.models'; 

@Component({
  selector: 'app-tab8',
  templateUrl: './tab8.page.html',
  styleUrls: ['./tab8.page.scss'],
})
export class Tab8Page implements OnInit {
  userEmail: string | null = null;
  apuestas: Apuestas[] | undefined;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private apuestasService: ApuestasService
  ) {}

  ngOnInit() {
    this.obtenerApuestasUsuarioActual();
    this.getCurrentUserEmail();
  }

  async getCurrentUserEmail() {
    try {
      const userResponse = await this.authService.getCurrentUser();
      
      if (userResponse) {
        this.userEmail = userResponse.email;
      } else {
        console.log("No hay usuario logueado");
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  }

  VolverAtras() {
    this.router.navigate(['/home']);
  }

  async obtenerApuestasUsuarioActual() {
    this.apuestas = await this.apuestasService.obtenerApuestasUsuarioActual()
  }

  exportarAPdf(apuesta: Apuestas) {
    // Implementa la lógica de exportación a PDF aquí
    console.log("Exportando a PDF la apuesta:", apuesta);
  }

}
