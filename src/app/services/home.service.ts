import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  //API_KEY="4d72107548021849835a6010529e5c7c"; 
  //BASE_URL = "http://localhost:8100/api/api.php";
  //BASE_URL = "https://apiclient.besoccerapps.com/scripts/api/api.php";
  //URL = `https://apiclient.besoccerapps.com/scripts/api/api.php?key=${this.API_KEY}&format=json&req=matchsday&date=${this.DATE}`;
  partidos: any;

  constructor(private httpClient: HttpClient) { }

  async getPartidos() {

    const headers = new HttpHeaders({
      'X-Auth-Token': 'feab5e72ee94431db81526ae1dd56d58'
    });

    //const URL = `/api`;
    //const URL = '/api/competitions/PL/matches?matchday=11';
    //const URL = `/api?url=https://api.football-data.org/v4/competitions/PL/matches?matchday=8`;
    const URL = `https://api.football-data.org/v4/competitions/PL/matches?matchday=8`;
    //const URL = `/v4/competitions/PL/matches?matchday=8`;

    //const URL = `${this.BASE_URL}?key=${params.key}&format=${params.format}&req=${params.req}&date=${params.date}`;

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
