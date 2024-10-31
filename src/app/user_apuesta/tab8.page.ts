import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { ApuestasService } from '../services/apuestas.service';
import { Apuestas } from '../models/apuestas.models';
import { jsPDF } from 'jspdf';

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

  /**
   * @function getCurrentUserEmail
   * @description Obtiene el correo electrónico del usuario actual y lo asigna a la variable userEmail.
   */
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

  /**
   * @function VolverAtras
   * @description Navega de regreso a la página de inicio.
   */
  VolverAtras() {
    this.router.navigate(['/home']);
  }

  /**
   * @function obtenerApuestasUsuarioActual
   * @description Carga las apuestas realizadas por el usuario actual y las asigna a la variable apuestas.
   */
  async obtenerApuestasUsuarioActual() {
    this.apuestas = await this.apuestasService.obtenerApuestasUsuarioActual();
  }

  /**
   * @function exportarAPdf
   * @description Genera un comprobante en PDF para una apuesta seleccionada, mostrando sus detalles.
   * @param {Apuestas} apuesta - Objeto de apuesta del cual se generará el PDF.
   */
  exportarAPdf(apuesta: Apuestas) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Comprobante de Apuesta', 20, 20);

    doc.setFontSize(12);
    doc.text(`Usuario: ${this.userEmail}`, 20, 30);
    doc.text(`Partido: ${apuesta.partido}`, 20, 40);
    doc.text(`Fecha de Apuesta: ${apuesta.fechaApuesta}`, 20, 50);
    doc.text(`Fecha de Partido: ${apuesta.fechaPartido}`, 20, 60);
    doc.text(`Resultado Apostado: ${apuesta.resultadoApostado}`, 20, 70);
    doc.text(`Estado: ${apuesta.estado}`, 20, 80);
    doc.text(`Multiplicador: ${apuesta.multiplicador}`, 20, 90);
    doc.text(`Monto Apostado: ${apuesta.monto}`, 20, 100);

    doc.save(`Comprobante_Apuesta_${apuesta.partido}.pdf`);
  }
}

