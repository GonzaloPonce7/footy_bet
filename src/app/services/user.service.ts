import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { FormGroup } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { ToastController } from '@ionic/angular';

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(
    private auth: AuthenticationService,
    private toastController: ToastController
  ) {}

  /**
   * @method load
   * @description Carga los datos del usuario desde Firestore y los aplica a un formulario.
   * @param {FormGroup<any>} formLogin - El formulario que contiene los campos de inicio de sesión.
   * @param {string} uid - El ID del usuario para buscar en la colección de Firestore.
   * @param {string} carpeta - El nombre de la colección en Firestore donde se encuentra el documento del usuario.
   */
  async load(formLogin: FormGroup<any>, uid: string, carpeta: string) {
    try {
      // Referencia al documento del usuario en Firestore
      const userDocRef = doc(db, `${carpeta}/${uid}`);
      
      // Obtener el documento del usuario
      const userDoc = await getDoc(userDocRef);
      
      // Verificar si el documento existe y aplicar los datos al formulario
      if (userDoc.exists()) {
        formLogin.patchValue(userDoc.data() as any);
      } else {
        console.error('Document does not exist');
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error ', error);
    }
  }
}