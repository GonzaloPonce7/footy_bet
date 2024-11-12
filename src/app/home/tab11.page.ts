import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { NavController } from '@ionic/angular';
import { Partido } from '../models/partidos.models';

@Component({
  selector: 'app-tab11',
  templateUrl: 'tab11.page.html',
  styleUrls: ['tab11.page.scss'],
})
export class Tab11Page implements OnInit {

  partidosPremier: Partido[] | undefined;
  selectedPartido: Partido | undefined;

  constructor(
    public router: Router,
    private homeService: HomeService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log('Inicia el home');
    this.partidosProximos();
  }

  /**
   * @function partidosProximos
   * @description Llama al servicio para obtener los partidos y filtra aquellos que ocurren en los próximos 5 días.
   */
  async partidosProximos() {
    try {
      const partidosDelDia: any = await this.homeService.getPartidos();
      console.log('Partidos del día:', partidosDelDia);
  
      const fechaActual = new Date();
      const fechaLimite = new Date();
      fechaLimite.setDate(fechaActual.getDate() + 12);
  
      this.partidosPremier = partidosDelDia.matches
        .filter((p: any) => this.enSiguientesCincoDias(p.utcDate, fechaActual, fechaLimite))
        .map((p: any) => {
          const fechaPartido = new Date(p.utcDate);
          
          // Formato de fecha y hora en horario de Argentina
          const opcionesFecha: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
          const opcionesHora: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'America/Argentina/Buenos_Aires' };
          
          const fechaFormateada = new Intl.DateTimeFormat('es-AR', opcionesFecha).format(fechaPartido);
          const horaFormateada = new Intl.DateTimeFormat('es-AR', opcionesHora).format(fechaPartido);

          let estado: string;
        if (this.esPartidoJugado(p.utcDate)) {
          estado = 'Finalizado';
        } else if (fechaPartido > fechaActual) {
          estado = 'Pendiente';
        } else {
          estado = 'Jugando';
        }
  
          return {
            id: p.id,
            local: p.homeTeam.name,
            visitor: p.awayTeam.name,
            competition_name: p.competition.name,
            date: fechaFormateada,
            time: horaFormateada,
            local_shield: p.homeTeam.crest,
            visitor_shield: p.awayTeam.crest,
            status: estado
          } as Partido;
        });
  
      console.log('Partidos Premier próximos 5 días:', this.partidosPremier);
    } catch (error) {
      console.error('Error al cargar los partidos:', error);
    }
  }
  

  /**
   * @function enSiguientesCincoDias
   * @description Verifica si la fecha del partido cae dentro de los próximos cinco días.
   * @param {string} fechaPartido - Fecha y hora del partido.
   * @param {Date} fechaActual - Fecha actual.
   * @param {Date} fechaLimite - Fecha límite de cinco días a partir de la fecha actual.
   * @returns {boolean} - Verdadero si el partido está dentro del rango; falso si no.
   */
  enSiguientesCincoDias(fechaPartido: string, fechaActual: Date, fechaLimite: Date): boolean {
    const fechaHoraPartido = new Date(fechaPartido);
    return fechaHoraPartido >= fechaActual && fechaHoraPartido <= fechaLimite;
  }

  /**
   * @function esPartidoJugado
   * @description Determina si un partido ya ha sido jugado comparando su fecha con la fecha actual.
   * @param {string} fechaPartido - Fecha y hora del partido.
   * @returns {boolean} - Verdadero si el partido ya fue jugado; falso si no.
   */
  esPartidoJugado(fechaPartido: string): boolean {
    const fechaHoraPartido = new Date(fechaPartido);
    const fechaHoraActual = new Date();
    return fechaHoraPartido <= fechaHoraActual;
  }

  /**
   * @function apostar
   * @description Navega a la página de apuesta, pasando el partido seleccionado como parámetro.
   * @param {any} partido - Objeto del partido seleccionado.
   */
  apostar(partido: any) {
    this.selectedPartido = partido;

    this.navCtrl.navigateForward('/apuesta', {
      queryParams: { partido: JSON.stringify(partido) },
    });
  }

  /**
   * @function VolverAtras
   * @description Navega de regreso a la página de login.
   */
  VolverAtras() {
    this.router.navigate(['/login']);
  }

  /**
   * @function irUser
   * @description Navega a la página de usuario.
   */
  irUser(){
    this.router.navigate(['/user']);
  }
}