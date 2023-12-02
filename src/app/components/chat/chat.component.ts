import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const userId = this.authService.getCurrentUserId()?.toString(); // Usando el operador de navegación segura
      const username = userId || 'Usuario Anónimo';
      this.chatService.sendMessage(this.newMessage, username);
      this.newMessage = '';
    }
  }
}
