import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  // Variable para almacenar la lista de partidos obtenida desde la API
  partidos: any;

  constructor(private httpClient: HttpClient) {}

  /**
   * @method getPartidos
   * @description Realiza una solicitud HTTP para obtener los partidos de la Premier League.
   * @returns {Promise<any>} - Retorna una promesa con la lista de partidos.
   */
  async getPartidos() {
    // Encabezado de autenticación requerido por la API externa
    const headers = new HttpHeaders({
      'X-Auth-Token': 'feab5e72ee94431db81526ae1dd56d58'
    });

    // URL del servidor proxy que apunta a la API de fútbol
    const URL = `http://localhost:3000/proxy?url=https://api.football-data.org/v4/competitions/PL/matches`;

    try {
      // Realiza la solicitud GET a través del cliente HTTP y almacena el resultado en la variable `partidos`
      this.partidos = await lastValueFrom(this.httpClient.get(URL, { headers }));
      console.log("Aca llegan los partidos desde el service: ", this.partidos);
      return this.partidos;
    } catch (error) {
      // Manejo de errores en caso de fallas en la solicitud
      console.error("Error al cargar los partidos", error);
      throw error;
    }
  }
}