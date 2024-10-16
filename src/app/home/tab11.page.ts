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
  fecha: string = '2024-10-06';

  constructor(
    public router: Router,
    private homeService: HomeService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log('Inicia el home');

    this.partidosPorFecha(this.fecha);
    //this.obtenerDocumentosFirestore();
  }

  async partidosPorFecha(fecha: string) {
    try {
      const partidosDelDia: any = await this.homeService.getPartidos(fecha);
      console.log('Partidos del día:', partidosDelDia);

      this.partidosPremier = partidosDelDia.matches
        .filter((p: { league_id: string }) => p.league_id == '76450')
        .map((p: any) => {
          return {
            id: p.id,
            local: p.local,
            visitor: p.visitor,
            competition_name: p.competition_name,
            date: `${p.date} ${p.hour}:${p.minute}`,
            local_shield: p.local_shield,
            visitor_shield: p.visitor_shield,
            result: p.result,
          } as Partido;
        });

      console.log('Partidos Premier filtrados:', this.partidosPremier);
    } catch (error) {
      console.error('Error al cargar los partidos:', error);
    }
  }

  esPartidoJugado(fechaPartido: string, horaPartido: string): boolean {
    const fechaHoraPartido = new Date(`${fechaPartido}T${horaPartido}`);
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
