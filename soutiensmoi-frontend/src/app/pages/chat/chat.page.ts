import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true, // Make sure this is true
  imports: [IonicModule, FormsModule, CommonModule] // Add CommonModule to imports
})
export class ChatPage {
  messages: any[] = [];
  newMessage = '';

  constructor(private chatService: ChatService) {
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getMessages().subscribe({
      next: (res) => this.messages = res,
      error: (err) => console.error(err)
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    this.chatService.sendMessage(this.newMessage).subscribe({
      next: (res) => {
        this.messages.push(res);
        this.newMessage = '';
      },
      error: (err) => console.error(err)
    });
  }
}
