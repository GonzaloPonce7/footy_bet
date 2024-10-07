import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab11',
  templateUrl: 'tab11.page.html',
  styleUrls: ['ta11.page.scss']
})
export class Tab11Page implements OnInit {

  documentos: any[] = [];
  filteredDocumentos: any[] = [];


  constructor(public router: Router) {}


  ngOnInit() {
    //this.obtenerDocumentosFirestore();
    return
  }

}
