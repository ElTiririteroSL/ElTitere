import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection = 'users';

  constructor(private firestore: AngularFirestore) { }

  getUserById(userId: string): Observable<User | undefined> {
    const userDocument: AngularFirestoreDocument<User> = this.firestore.collection(this.usersCollection).doc(userId);
    return userDocument.valueChanges();
  }

  createUser(userData: User): Promise<void> {
    const userDocument: AngularFirestoreDocument<User> = this.firestore.collection(this.usersCollection).doc(userData.id);
    return userDocument.set(userData);
  }

  updateUser(userId: string, newData: Partial<User>): Promise<void> {
    const userDocument: AngularFirestoreDocument<User> = this.firestore.collection(this.usersCollection).doc(userId);
    return userDocument.update(newData);
  }

  deleteUser(userId: string): Promise<void> {
    const userDocument: AngularFirestoreDocument<User> = this.firestore.collection(this.usersCollection).doc(userId);
    return userDocument.delete();
  }
}