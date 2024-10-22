import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  partidos: any;

  constructor(private httpClient: HttpClient) { }

  async getPartidos() {
    const headers = new HttpHeaders({
      'X-Auth-Token': 'feab5e72ee94431db81526ae1dd56d58'
    });

    // Usa la URL del proxy
    const URL = `http://localhost:3000/proxy?url=https://api.football-data.org/v4/competitions/PL/matches`;

    try {
      this.partidos = await lastValueFrom(this.httpClient.get(URL, { headers }));
      console.log("Aca llegan los partidos desde el service: ", this.partidos);
      return this.partidos;
    } catch (error) {
      console.error("Error al cargar los partidos", error);
      throw error;
    }
  } 
}
