import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { ApuestasService } from '../services/apuestas.service';
import { Apuestas } from '../models/apuestas.models'; 

@Component({
  selector: 'app-tab8',
  templateUrl: './tab8.page.html',
  styleUrls: ['./tab8.page.scss'],
})
export class Tab8Page implements OnInit {
  userEmail: string = '';
  apuestas: Apuestas[] | undefined;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private apuestasService: ApuestasService
  ) {}

  ngOnInit() {
    this.obtenerApuestasUsuarioActual();
    this.getCurrentUser();
  }

  async getCurrentUser() {
    const response = await this.authService.getCurrentUser()
    console.log("Aca vienel a respuesta al getCurrentUser: ", response);
  }

  VolverAtras() {
    this.router.navigate(['/apuesta']);
  }

  async obtenerApuestasUsuarioActual() {
    this.apuestas = await this.apuestasService.obtenerApuestasUsuarioActual()
  }

}
