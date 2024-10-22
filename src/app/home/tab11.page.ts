import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
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
  //fecha: string = '2024-10-06';

  constructor(
    public router: Router,
    private homeService: HomeService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log('Inicia el home');

    this.partidosPorFecha();
    //this.obtenerDocumentosFirestore();
  }

  async partidosPorFecha() {
    try {
      const partidosDelDia: any = await this.homeService.getPartidos();
      console.log('Partidos del día:', partidosDelDia);

      this.partidosPremier = partidosDelDia.matches.slice(0, 4).map((p: any) => {
        return {
          id: p.id,
          local: p.homeTeam.name, // Nombre del equipo local
          visitor: p.awayTeam.name, // Nombre del equipo visitante
          competition_name: p.competition.name, // Nombre de la competición
          date: p.utcDate, // Fecha del partido en UTC
          local_shield: p.homeTeam.crest, // Escudo del equipo local
          visitor_shield: p.awayTeam.crest, // Escudo del equipo visitante
          result: p.status // Estado del partido
        } as Partido;
      });

      console.log('Partidos Premier filtrados:', this.partidosPremier);
    } catch (error) {
      console.error('Error al cargar los partidos:', error);
    }
  }

  esPartidoJugado(fechaPartido: string): boolean {
    const fechaHoraPartido = new Date(`${fechaPartido}`);
    const fechaHoraActual = new Date();

    // Si la fecha y hora del partido es menor que la fecha actual, entonces ya se jugó
    return fechaHoraPartido <= fechaHoraActual;
  }

  apostar(partido: any) {
    // Navega a la página de apuestas pasando los datos del partido
    this.navCtrl.navigateForward('/apuesta', {
      queryParams: { partido: JSON.stringify(partido) },
    });
  }

  VolverAtras() {
    this.router.navigate(['/login']);
  }
}
