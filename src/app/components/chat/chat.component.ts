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
  username: string = 'Usuario Anónimo';

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      // Obtén el nombre de usuario justo antes de enviar el mensaje
      this.authService.getCurrentUsername().subscribe((username: string) => {
        this.username = username || 'Usuario Anónimo';
        this.chatService.sendMessage(this.newMessage, this.username);
        this.newMessage = '';
      });
    }
  }
}
