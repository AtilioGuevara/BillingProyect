import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestApiService } from '../../../../Core/service/rest-api.service';
interface ChatVideo {
  name: string;
  imageUrl: string;
}
export interface UserMessage {
  avatar: string;
  name: string;
  message: string;
  time: string;
}

@Component({
    selector: 'app-apps-chat-group-video',
    imports: [
        PageTitleComponent,
        SimplebarAngularModule,
        LucideAngularModule,
        CommonModule,
        FormsModule,
    ],
    templateUrl: './apps-chat-group-video.component.html',
    styleUrl: './apps-chat-group-video.component.scss'
})
export class AppsChatGroupVideoComponent {
  options = { autoHide: true };
  newMessage: string = '';
  usermsg: UserMessage[] = [];

  chatVideos: ChatVideo[] = [
    { name: 'You', imageUrl: 'assets/images/chat/video-7.png' },
    { name: 'Michaela Sutton', imageUrl: 'assets/images/chat/video-2.png' },
    { name: 'James Davis', imageUrl: 'assets/images/chat/video-3.png' },
    { name: 'Wendy Dugan', imageUrl: 'assets/images/chat/video-4.png' },
    { name: 'Carlos Garcia', imageUrl: 'assets/images/chat/video-5.png' },
    { name: 'Lorna Yancey', imageUrl: 'assets/images/chat/video-6.png' },
  ];
  showCaptions = true;

  toggleCaptions() {
    this.showCaptions = !this.showCaptions;
  }
  volume: number = 50;

  decreaseVolume() {
    if (this.volume > 0) {
      this.volume -= 10;
    }
  }

  increaseVolume() {
    if (this.volume < 100) {
      this.volume += 10;
    }
  }
  currentTime: number = 0;
  formattedTime: string = '00:00:00';
  newPinText: string = '';
  pins: { time: string; text: string }[] = [
    { time: '00:03:01', text: 'Deadline Discussed' },
    { time: '00:02:48', text: 'Design Issue' },
    { time: '00:01:48', text: 'Weekly Update' },
  ];

  ngOnInit(): void {
    this.startTimer();
    this.projectData();
  }

  startTimer(): void {
    setInterval(() => {
      this.currentTime++;
      this.formattedTime = this.formatTime(this.currentTime);
    }, 1000);
  }

  formatTime(seconds: number): string {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  addPin(): void {
    if (this.newPinText.trim() === '') return;
    this.pins.unshift({ time: this.formattedTime, text: this.newPinText });
    this.newPinText = '';
  }

  constructor(public restApiService: RestApiService) {}

  projectData() {
    this.restApiService.getUserData().subscribe((data: any) => {
      this.usermsg = data;
    });
  }
  sendMessage() {
    if (this.newMessage.trim() === '') return;

    this.usermsg.push({
      avatar: 'assets/images/avatar/user-17.png', // Replace with user's avatar path
      name: 'Sophia Mia', // Replace with user's name
      message: this.newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });

    this.newMessage = '';
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const chat = document.getElementById('chat-messages');
      if (chat) {
        const lastMessage = chat.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    }, 200);
  }
}
