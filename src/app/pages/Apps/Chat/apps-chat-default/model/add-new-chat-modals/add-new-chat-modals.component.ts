import { Component } from '@angular/core';
import { SimplebarAngularModule } from 'simplebar-angular';
import { RestApiService } from '../../../../../../Core/service/rest-api.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { FormsModule } from '@angular/forms';

export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface Chat {
  name: string;
  avatar: string;
  avatarText?: string;
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
  type: 'received' | 'sent';
  images?: string[];
  extraImagesCount?: string;
}

export interface ChatData {
  users: User[];
  chats: Chat[];
  messages: Message[];
}

@Component({
    selector: 'app-add-new-chat-modals',
    imports: [
        SimplebarAngularModule,
        CommonModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './add-new-chat-modals.component.html',
    styleUrls: ['./add-new-chat-modals.component.scss']
})
export class AddNewChatModalsComponent {
  options = { autoHide: true };
  allChatUser: User[] = [];
  filteredChatUser: User[] = [];
  searchQuery: string = '';

  constructor(
    public restApiService: RestApiService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadChatData();
  }

  loadChatData(): void {
    this.restApiService.getChatDefaultData().subscribe((data: any) => {
      this.allChatUser = data.users;
      this.filteredChatUser = data.users; // Initialize filtered list
    });
  }

  closeFileModal() {
    this.modalService.close();
  }

  filterChatUsers(): void {
    this.filteredChatUser = this.allChatUser.filter((user) =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
