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
 * @description Obtiene el correo electrónico del usuario actualmente autenticado. 
 * Si el usuario está autenticado, asigna su correo a la variable `userEmail`. 
 * En caso de error al obtener la información del usuario, se registra el error en la consola.
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
 * @description Navega a la ruta '/home', llevando al usuario de vuelta a la página principal de la aplicación.
 */
  VolverAtras() {
    this.router.navigate(['/home']);
  }
  
  /**
 * @function obtenerApuestasUsuarioActual
 * @description Obtiene las apuestas del usuario actualmente autenticado y las almacena en la propiedad `apuestas`.
 */
  async obtenerApuestasUsuarioActual() {
    this.apuestas = await this.apuestasService.obtenerApuestasUsuarioActual();
  }

  /**
 * @function exportarAPdf
 * @description Genera un archivo PDF con el comprobante de una apuesta, incluyendo detalles como el usuario, el partido, las fechas y horas de la apuesta y del partido, el resultado apostado, el estado, el multiplicador y el monto apostado. Luego, descarga el archivo PDF generado.
 */
  exportarAPdf(apuesta: Apuestas) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Comprobante de Apuesta', 20, 20);

    doc.setFontSize(12);
    doc.text(`Usuario: ${this.userEmail}`, 20, 30);
    doc.text(`Partido: ${apuesta.partido}`, 20, 40);
    doc.text(`Fecha de Apuesta: ${this.formatDate(apuesta.fechaApuesta)}`, 20, 50);
    doc.text(`Hora de Apuesta: ${this.formatTime(apuesta.fechaApuesta)}`, 20, 60);
    doc.text(`Fecha de Partido: ${this.formatDate(apuesta.fechaPartido)}`, 20, 70);
    doc.text(`Hora de Partido: ${this.formatTime(apuesta.fechaPartido)}`, 20, 80);
    doc.text(`Resultado Apostado: ${apuesta.resultadoApostado}`, 20, 90);
    doc.text(`Estado: ${apuesta.estado}`, 20, 100);
    doc.text(`Multiplicador: ${apuesta.multiplicador}`, 20, 110);
    doc.text(`Monto Apostado: ${apuesta.monto}`, 20, 120);

    doc.save(`Comprobante_Apuesta_${apuesta.partido}.pdf`);
  }

  /**
 * @function formatDate
 * @description Formatea una cadena de fecha en un formato legible (día, mes y año) utilizando la configuración regional de Argentina (es-AR). Convierte la cadena de fecha en un objeto `Date` y luego aplica el formato deseado.
 * @param {string} dateString - La cadena de fecha a formatear.
 * @returns {string} La fecha formateada en un formato legible.
 */
  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-AR', options).format(date);
  }

  /**
 * @function formatTime
 * @description Formatea una cadena de fecha en un formato de hora legible (hora y minuto) utilizando la configuración regional de Argentina (es-AR). Convierte la cadena de fecha en un objeto `Date` y luego aplica el formato deseado sin usar el formato de 12 horas.
 * @param {string} dateString - La cadena de fecha de la que se extraerá la hora.
 * @returns {string} La hora formateada en un formato legible.
 */
  formatTime(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'America/Argentina/Buenos_Aires' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-AR', options).format(date);
  }
}
