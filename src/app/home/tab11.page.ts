import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-tab11',
  templateUrl: 'tab11.page.html',
  styleUrls: ['tab11.page.scss']
})
export class Tab11Page implements OnInit {

  partidosDelDia: any[] = [];
  partidosPremier: any[] = [];

  constructor(public router: Router, private homeService: HomeService, private navCtrl: NavController) {}

  async ngOnInit() {
    try {
      this.partidosDelDia = await this.homeService.getPartidos();
      console.log(this.partidosDelDia);
      
      this.partidosPremier = this.partidosDelDia.filter( 
        p => p.league_id === "76450");
    } catch (error) {
      console.error('Error al cargar los partidos:', error);
    }
    //this.obtenerDocumentosFirestore();

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
      queryParams: { partido: JSON.stringify(partido) }
    });
  }

  VolverAtras() {
    this.router.navigate(['/login']);
  }

}
