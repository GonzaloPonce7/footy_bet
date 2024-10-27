import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partido } from '../models/partidos.models';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})

export class Tab3Page implements OnInit {
  partido: Partido | undefined;
  montoLocal: number = 0;
  montoEmpate: number = 0;
  montoVisitante: number = 0;
  totalLocal: number = 0;
  totalEmpate: number = 0;
  totalVisitante: number = 0;

  readonly multiplicadorLocal = 2.30;
  readonly multiplicadorEmpate = 2.70;
  readonly multiplicadorVisitante = 3.00;

  constructor(private route: ActivatedRoute, private alertController: AlertController) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['partido']) {
        this.partido = JSON.parse(params['partido']);
      }
    });
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
          handler: (data: any) => {
            let esValido: boolean = this.validarInput(data);

            if (esValido){
              const monto = parseFloat(data.monto);

              switch (tipo) {
                case 'Local':
                  this.montoLocal = monto;
                  this.totalLocal = monto * this.multiplicadorLocal;
                  return true;
                case 'Empate':
                  this.montoEmpate = monto;
                  this.totalEmpate = monto * this.multiplicadorEmpate;
                  return true;
                case 'Visitante':
                  this.montoVisitante = monto;
                  this.totalVisitante = monto * this.multiplicadorVisitante;
                  return true;
              }
            }
          },
        },
      ],
    });
    await toast.present();
  }

  validarInput(input: any): boolean {
    if (input && input.monto) {
      if (!isNaN(input) || input > 0) {
        return true
      }
    }
    this.presentToast('Debe ingresar un valor correcto');
    return false;
  }

  async presentToast(mensage: string) {
    let toast = await this.alertController.create({
      message: mensage
    });
    toast.present();
  }
}