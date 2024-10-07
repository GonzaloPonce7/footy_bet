import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  documentos: any[] = [];
  filteredDocumentos: any[] = [];


  constructor(public router: Router) {}


  ngOnInit() {
    //this.obtenerDocumentosFirestore();
    return
  }

}
