import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  API_KEY="4d72107548021849835a6010529e5c7c"; 
  URL = `https://apiclient.besoccerapps.com/scripts/api/api.php?key=${this.API_KEY}&format=json&req=matchsday`;
  partidos: any;

  constructor(private httpClient: HttpClient) { }

  async getPartidos() {

    try {
      this.partidos = await lastValueFrom(this.httpClient.get(this.URL));
      return this.partidos;
    } catch (error) {
      console.error("Error al cargar los partidos", error);
      throw error;
    }


  } 
}
