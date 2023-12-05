import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('messagesDiv') messagesDiv: ElementRef | undefined;

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUsername().subscribe((username: string) => {
      this.username = username || 'Usuario Anónimo';
  
      // Obtener la marca de tiempo actual
      const currentTimeStamp = new Date().getTime();
  
      // Obtener mensajes solo desde el momento en que el usuario entra
      this.chatService.getMessagesSince(currentTimeStamp).subscribe((messages) => {
        this.messages = messages;
        this.scrollToBottom();
      });
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      // Limitar la longitud del mensaje a 100 caracteres
      const trimmedMessage = this.newMessage.substring(0, 100);
  
      this.authService.getCurrentUsername().subscribe((username: string) => {
        this.username = username || 'Usuario Anónimo';
        
        // Enviar el mensaje truncado
        this.chatService.sendMessage(trimmedMessage, this.username);
  
        this.newMessage = '';
  
        // Esperar un breve momento antes de desplazarse hacia abajo
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      });
    }
  }

  private scrollToBottom(): void {
    if (this.messagesDiv) {
      this.messagesDiv.nativeElement.scrollTop = this.messagesDiv.nativeElement.scrollHeight;
    }
  }
}
