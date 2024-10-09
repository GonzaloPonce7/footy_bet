import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab11',
  templateUrl: 'tab11.page.html',
  styleUrls: ['tab11.page.scss']
})
export class Tab11Page implements OnInit {

  partidosDelDia: any[] = [];
  filteredDocumentos: any[] = [];


  constructor(public router: Router) {}


// private geocodeDirecciones(): void {
  //   this.documentos.forEach((documento) => {
  //     const direccion = documento.direccion;
  //     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;

  //     fetch(url)
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.length > 0) {
  //           const latlng = new L.LatLng(data[0].lat, data[0].lon);
  //           if (this.esCABA(latlng)) {
  //             this.addMarker(latlng);
  //           } else {
  //             console.log('La dirección está fuera de CABA:', direccion);
  //           }
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error al geocodificar la dirección:', error);
  //       });
  //   });
  // }

  ngOnInit() {
    //this.obtenerDocumentosFirestore();
    return
  }

  VolverAtras() {
    this.router.navigate(['/login']);
  }

}
