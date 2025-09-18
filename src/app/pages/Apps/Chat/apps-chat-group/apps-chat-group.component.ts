import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CreateGroupModalComponent } from './model/create-group-modal/create-group-modal.component';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { CallModalComponent } from '../apps-chat-default/model/call-modal/call-modal.component';
import { VideoCallModalComponent } from '../apps-chat-default/model/video-call-modal/video-call-modal.component';
interface Group {
  name: string;
  image: string;
  message: string;
  time: string;
  badge?: string;
  unread: boolean;
  active: boolean;
}

interface User {
  name: string;
  avatar: string;
  status: string;
}

interface Message {
  user: User;
  timestamp: string;
  message: string;
  type: 'received' | 'sent';
}

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface ChatData {
  groups: Group[];
  messages: Message[];
  members: Member[];
}

@Component({
    selector: 'app-apps-chat-group',
    imports: [
        PageTitleComponent,
        CommonModule,
        SimplebarAngularModule,
        DomixDropdownModule,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './apps-chat-group.component.html',
    styleUrl: './apps-chat-group.component.scss'
})
export class AppsChatGroupComponent {
  options = { autoHide: true };
  allChatdata: ChatData[] = [];
  allGroup: Group[] = [];
  filteredGroups: Group[] = [];
  allMessage: Message[] = [];
  allMembers: Member[] = [];
  searchTerms: string = '';
  selectedGroup: Group | null = null;

  constructor(
    public restApiService: RestApiService,
    private modalService: ModalService
  ) { }

  default = {
    "name": "Shopify Developers",
    "image": "assets/images/brands/img-08.png",
    "message": "Hello, How are you?",
    "time": "11:48AM",
    "badge": "2",
    "unread": true,
    "active": true
  }

  ngOnInit(): void {
    this.selectGroup(this.default);
    this.projectData();
  }

  projectData() {
    this.restApiService.getGroupData().subscribe((data: any) => {
      this.allGroup = data.groups;
      this.filteredGroups = this.allGroup;
      this.allMessage = data.messages;
      this.allMembers = data.members;
    });
  }
  filterGroups() {
    const searchTermLower = this.searchTerms.toLowerCase();
    this.filteredGroups = this.allGroup.filter(
      (group) =>
        group.name.toLowerCase().includes(searchTermLower) ||
        group.message.toLowerCase().includes(searchTermLower)
    );
  }

  onSearchTermChange() {
    this.filterGroups();
  }
  activeChatIndex: number | null = null;

  setActiveChat(index: number): void {
    this.activeChatIndex = index;
  }
  selectGroup(group: Group) {
    this.selectedGroup = group;
  }

  isActiveChat(index: number): boolean {
    return this.activeChatIndex === index;
  }

  message: string = '';

  sendMessage(): void {
    if (this.message.trim()) {
      this.allMessage.push({
        user: {
          name: 'You',
          avatar: 'assets/images/avatar/user-17.png',
          status: 'online',
        },
        message: this.message,
        timestamp: new Date().toLocaleTimeString(),
        type: 'sent',
      });
      this.message = '';
      this.scrollToBottom();
    }
  }
  scrollToBottom(): void {
    setTimeout(() => {
      const chat = document.getElementById('groupchat-messages');
      if (chat) {
        const lastMessage = chat.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    }, 200);
  }

  openCreateFolderModal() {
    this.modalService.open(CreateGroupModalComponent, {}, (result) => {
      if (result) {
        this.allGroup.unshift(result);
      }
    });
  }

  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.allMessage.splice(index, 1);
      }
    });
  }

  clearChat() {
    this.message = '';
  }

  openCallModal() {
    console.log(this.selectedGroup);
    this.modalService.open(CallModalComponent, this.selectedGroup, (result) => {});
  }

  openVideoCallModal() {
    this.modalService.open(VideoCallModalComponent);
  }
}
