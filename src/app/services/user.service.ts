import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDoc, getFirestore, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { FormGroup } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { ToastController } from '@ionic/angular';

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: AuthenticationService, private toastController: ToastController) { }

    async load(formLogin: FormGroup<any>, uid: string, carpeta: string) {
      try {
        const userDocRef = doc(db, `${carpeta}/${uid}`);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          formLogin.patchValue(userDoc.data() as any);
        } else {
          console.error('Document does not exist');
        }
      } catch (error) {
        console.error('Error ', error);
      }
    }

}
