import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app'; 
import { getFirestore } from 'firebase/firestore/lite';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment'; 


if (environment.production) {
  enableProdMode();
}

// Inicializa Firebase con la configuración importada
const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore con la app de Firebase

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
