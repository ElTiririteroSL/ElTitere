import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection = 'users'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) { }

  // Obtener información de un usuario por ID
  getUserById(userId: string): Observable<User | undefined> {
    const userDocument: AngularFirestoreDocument<User> = this.firestore.collection(this.usersCollection).doc(userId);
    return userDocument.valueChanges();
  }

  // Crear un nuevo usuario
  createUser(userData: User): Promise<void> {
    const userDocument: AngularFirestoreDocument<User> = this.firestore.collection(this.usersCollection).doc(userData.id);
    return userDocument.set(userData);
  }

  // Actualizar información de un usuario
  updateUser(userId: string, newData: Partial<User>): Promise<void> {
    const userDocument: AngularFirestoreDocument<User> = this.firestore.collection(this.usersCollection).doc(userId);
    return userDocument.update(newData);
  }

  // Eliminar un usuario
  deleteUser(userId: string): Promise<void> {
    const userDocument: AngularFirestoreDocument<User> = this.firestore.collection(this.usersCollection).doc(userId);
    return userDocument.delete();
  }
}