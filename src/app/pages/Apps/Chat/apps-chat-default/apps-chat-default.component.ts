import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CommonModule } from '@angular/common';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { AddNewChatModalsComponent } from './model/add-new-chat-modals/add-new-chat-modals.component';
import { CallModalComponent } from './model/call-modal/call-modal.component';
import { VideoCallModalComponent } from './model/video-call-modal/video-call-modal.component';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';

export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface Chat {
  name: string;
  avatar: string;
  avatarText?: string; // Made optional
  status: 'online' | 'offline';
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export interface Message {
  sender: string;
  time: string;
  text: string;
  avatar: string;
  avatarText?: string;
  type: 'received' | 'sent';
  images?: string[];
  extraImagesCount?: string; // Made optional
}

export interface ChatData {
  users: User[];
  chats: Chat[];
  messages: Message[];
}

@Component({
    selector: 'app-apps-chat-default',
    imports: [
        PageTitleComponent,
        SimplebarAngularModule,
        CommonModule,
        DomixDropdownModule,
        LucideAngularModule,
        FormsModule,
        EmojiModule,
    ],
    templateUrl: './apps-chat-default.component.html',
    styleUrls: ['./apps-chat-default.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppsChatDefaultComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  isEmojiPickerVisible = false;
  options = { autoHide: true };
  allChatUser: User[] = [];
  allMessage: Message[] = [];
  allChat: Chat[] = [];
  activeChatIndex: number = -1;
  chatName: string = '';
  chatAvatar: string = '';
  avatarText: string = '';
  filteredChat: Chat[] = [];
  message: string = '';
  searchChat: string = '';
  selectedGroup: Chat | null = null;

  selectedData: any = {};

  constructor(
    public restApiService: RestApiService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loadChatData();
  }

  loadChatData(): void {
    this.restApiService.getChatDefaultData().subscribe((data: any) => {
      this.allChatUser = data.users;
      this.allMessage = data.messages;
      this.allChat = data.chats;
      this.filteredChat = data.chats;
      this.setActiveChat();
    });
  }

  setActiveChat(index: number = 0): void {
    this.activeChatIndex = index;
    if (index >= 0 && index < this.allChat.length) {
      const chat = this.allChat[index];
      const avatar = chat.avatar;

      this.selectedData.avatar = avatar;
      this.selectedData.name = chat.name;
      this.selectedData.avatarText = chat.avatarText;

      console.log(this.selectedData);

      this.allMessage.forEach((message) => {
        if (message.type === 'received') {
          message.avatar = avatar || '';
          this.chatName = chat.name;
          this.chatAvatar = avatar || '';
        }
      });
    }
    this.scrollToBottom();
  }

  isActiveChat(index: number): boolean {
    return this.activeChatIndex === index;
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

  sendMessage(): void {
    if (this.message.trim()) {
      // Implement logic to send the message
      const newMessage: Message = {
        sender: 'You',
        time: new Date().toLocaleTimeString(),
        text: this.message,
        avatar: 'assets/images/avatar/user-17.png',
        type: 'sent',
      };
      this.allMessage.push(newMessage);
      this.scrollToBottom();
      this.message = '';
    }
  }

  toggleEmojiPicker() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }

  addEmoji(event: any) {
    this.message += event.emoji.native; // Append selected emoji
    this.isEmojiPickerVisible = false;  // Close picker after selection
  }


  openAddNewChatModals() {
    this.modalService.open(AddNewChatModalsComponent, {}, (result) => {
      if (result) {
        this.allChatUser.push(result);
      }
    });
  }
  filterChats(): void {
    this.filteredChat = this.allChat.filter((chat) =>
      chat.name.toLowerCase().includes(this.searchChat.toLowerCase())
    );
  }

  openCallModal() {
    this.modalService.open(CallModalComponent, this.selectedData);
  }

  openVideoCallModal() {
    this.modalService.open(VideoCallModalComponent);
  }

  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.allMessage.splice(index, 1);
      }
    });
  }

  clearChat() {
    this.message = ''; // Reset input field
    console.log('Chat cleared'); // Optional: Log or trigger additional behavior
  }
}