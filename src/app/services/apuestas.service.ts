import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Apuestas } from '../models/apuestas.models';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class ApuestasService {
  
  private collectionName = 'apuestas';
  
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { }

  async obtenerApuestasUsuarioActual(): Promise<Apuestas[]> {
    try {
      const user = await this.auth.currentUser;
      if (!user) {
        throw new Error('Usuario no autenticado');
      }
      
      const userId = user.uid;
      const snapshot = await this.firestore
        .collection<Apuestas>(this.collectionName, ref => ref.where('userId', '==', userId))
        .get()
        .toPromise();

        if (!snapshot || snapshot.empty) {
          console.log('No se encontraron apuestas para este usuario.');
          return [];
        }

      return snapshot.docs.map(doc => doc.data() as Apuestas)
    } catch (error) {
      console.error('Error al obtener las apuestas del usuario:', error);
      throw error;
    }
  }

  async crearApuesta(apuesta: Apuestas): Promise<void> {
    const id = this.firestore.createId();
    apuesta.id = id;

    try {
      await this.firestore
        .collection<Apuestas>(this.collectionName)
        .doc(id)
        .set(apuesta);
      console.log('Apuesta creada con éxito');
    } catch (error) {
      console.error('Error al crear la apuesta:', error);
      throw error;
    }
  }

}
