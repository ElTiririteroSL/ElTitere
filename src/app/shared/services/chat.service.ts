import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private db: AngularFireDatabase) {}

  getMessages(): Observable<any[]> {
    return this.db.list('messages').valueChanges();
  }

  sendMessage(message: string, username: string): void {
    this.db.list('messages').push({
      message,
      username
    });
  }
}
