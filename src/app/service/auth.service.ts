import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afService: AngularFireAuth,
    private firestor: AngularFirestore
  ) {}
  registro(
    name: string,
    surname: string,
    ci: string,
    email: string,
    password: string,
    rol: string
  ) {
    return this.afService
      .createUserWithEmailAndPassword(email, password)
      .then((resul) => {
        return this.firestor.collection('usuarios').doc(resul.user?.uid).set({
          name,
          surname,
          ci,
          email,
          rol,
        });
      })
      .catch((error) => {
        console.error('error al registrarse', error);
      });
  }
  login(email: string, password: string) {
    return this.afService
      .signInWithEmailAndPassword(email, password)
      .then((credencialesUsuario) => {
        const uid = credencialesUsuario.user?.uid;
        return this.firestor.collection('usuarios').doc(uid).get();
      });
  }
  logout() {
    return this.afService.signOut();
  }
}
