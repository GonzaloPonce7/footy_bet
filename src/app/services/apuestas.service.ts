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

  private collectionName = 'Apuestas';

  constructor(
    private firestore: AngularFirestore, 
    private auth: AngularFireAuth
  ) { }

  /**
   * @method obtenerApuestasUsuarioActual
   * @description Recupera las apuestas realizadas por el usuario actualmente autenticado.
   * @returns {Promise<Apuestas[]>} - Devuelve una lista de objetos `Apuestas` correspondientes al usuario actual.
   * @throws {Error} - Lanza un error si el usuario no está autenticado o si ocurre un error en la consulta de Firestore.
   */
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

      // Mapea y devuelve las apuestas del usuario actual
      return snapshot.docs.map(doc => doc.data() as Apuestas);
    } catch (error) {
      console.error('Error al obtener las apuestas del usuario:', error);
      throw error;
    }
  }

  /**
   * @method crearApuesta
   * @description Crea una nueva apuesta en Firestore para el usuario actual.
   * @param {Apuestas} apuesta - Objeto `Apuestas` que contiene los detalles de la apuesta.
   * @returns {Promise<void>} - Retorna una promesa resuelta si la apuesta se crea con éxito, o lanza un error en caso de fallo.
   * @throws {Error} - Lanza un error si ocurre algún problema durante la creación de la apuesta en Firestore.
   */
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