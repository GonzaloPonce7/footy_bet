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
  partidosPremier: Partido[] = [];

  constructor(
    public router: Router,
    private homeService: HomeService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log('Inicia el home');

    this.partidosProximos();
  }

  async partidosProximos() {
    try {
      const partidosDelDia: any = await this.homeService.getPartidos();
      console.log('Partidos del día:', partidosDelDia);

      const fechaActual = new Date();
      const fechaLimite = new Date();
      fechaLimite.setDate(fechaActual.getDate() + 5);

      this.partidosPremier = partidosDelDia.matches
        .filter((p: any) => this.enSiguientesSieteDias(p.utcDate, fechaActual, fechaLimite))
        .map((p: any) => {
          return {
            id: p.id,
            local: p.homeTeam.name,
            visitor: p.awayTeam.name,
            competition_name: p.competition.name,
            date: p.utcDate,
            local_shield: p.homeTeam.crest,
            visitor_shield: p.awayTeam.crest,
            result: p.status
          } as Partido;
        });

      console.log('Partidos Premier próximos 5 días:', this.partidosPremier);
    } catch (error) {
      console.error('Error al cargar los partidos:', error);
    }
  }

  enSiguientesSieteDias(fechaPartido: string, fechaActual: Date, fechaLimite: Date): boolean {
    const fechaHoraPartido = new Date(fechaPartido);
    return fechaHoraPartido >= fechaActual && fechaHoraPartido <= fechaLimite;
  }

  // Aquí se añade la función que faltaba
  esPartidoJugado(fechaPartido: string): boolean {
    const fechaHoraPartido = new Date(fechaPartido);
    const fechaHoraActual = new Date();
    return fechaHoraPartido <= fechaHoraActual;
  }

  apostar(partido: any) {
    this.navCtrl.navigateForward('/apuesta', {
      queryParams: { partido: JSON.stringify(partido) },
    });
  }

  VolverAtras() {
    this.router.navigate(['/login']);
  }
}
