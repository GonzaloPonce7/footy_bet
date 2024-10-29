import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partido } from '../models/partidos.models';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApuestasService } from '../services/apuestas.service';
import { Apuestas } from '../models/apuestas.models';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  partido: Partido | undefined;
  userId: string | null = null;

  readonly multiplicador = {
    Empate: 2.7,
    Local: 2.3,
    Visitante: 3.0,
  };

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    public router: Router,
    private authService: AuthenticationService,
    private apuestasService: ApuestasService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['partido']) {
        this.partido = JSON.parse(params['partido']);
      }
    });

    this.getCurrentUserId();
  }

  async ingresarMonto(tipo: string) {
    const toast = await this.alertController.create({
      header: `Ingrese su apuesta para ${tipo}`,
      inputs: [
        {
          type: 'number',
          name: 'monto',
          placeholder: 'Monto',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: async (data: any) => {
            console.log('Aca llega la data del toast ', data);

            if (!this.validarInput(data)) return false;

            const monto = parseFloat(data.monto);
            if (
              !this.partido ||
              (tipo != 'Local' && tipo != 'Empate' && tipo != 'Visitante')
            ) {
              return false;
            }

            const nuevaApuesta: Apuestas = {
              id: '',
              userId: this.userId,
              partidoId: this.partido.id,
              fechaApuesta: new Date().toString(),
              fechaPartido: this.partido.date,
              resultadoApostado: tipo,
              partido: `${this.partido.local} VS ${this.partido.visitor}`,
              estado: 'pendiente',
              multiplicador: this.multiplicador[tipo],
              monto: monto,
            };
            try {
              await this.apuestasService.crearApuesta(nuevaApuesta);
              this.router.navigate(['/user']);
              return true;
            } catch (error) {
              console.error();
              return false;
            }
          },
        },
      ],
    });
    await toast.present();
  }

  validarInput(input: any): boolean {
    if (input && input.monto) {
      if (!isNaN(input.monto) || input.monto > 0) {
        return true;
      }
    }
    this.presentToast('Debe ingresar un valor correcto');
    return false;
  }

  async presentToast(mensage: string) {
    let toast = await this.alertController.create({
      message: mensage,
    });
    toast.present();
  }

  async getCurrentUserId() {
    try {
      const userResponse = await this.authService.getCurrentUser();
      
      if (userResponse) {
        this.userId = userResponse.uid;
      } else {
        console.log("No hay usuario logueado");
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  }

  VolverAtras() {
    this.router.navigate(['/home']);
  }
}
