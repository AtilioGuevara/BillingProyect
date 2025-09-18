import { Component, OnInit } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { SimplebarAngularModule } from 'simplebar-angular';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { MainIndoxComponent } from './main-indox/main-indox.component';
import { MailActionSectionComponent } from './mail-action-section/mail-action-section.component';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { CompoceMailComponent } from './compoce-mail/compoce-mail.component';

interface UseEmail {
  image: string,
  name: string,
  email: string,
}

export interface EmailReply {
  id: number;
  sender: string;
  email: string;
  date: string;
  subject: string;
  message: string;
  avatarImage: string;
  avatarText: string;
}

export interface AllEmail {
  id: number;
  sender: string;
  email: string;
  date: string;
  subject: string;
  message: string;
  avatarImage: string;
  badges: string[];
  type: number;
  avatarText: string;
  selected: boolean;
  replies: EmailReply[];
  attachments: Attachments[];
}

export interface Attachments {
  title: string,
  size: string,
  type: string,
}

export enum EmailMenuType {
  Drafts,
  Spam,
  Trash,
  Important,
  Scheduled,
  Sent,
  Starred,
  Inbox,
  Team,
}

@Component({
    selector: 'app-apps-mailbox',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule, MailActionSectionComponent, DomixDropdownModule, SimplebarAngularModule, MainIndoxComponent],
    templateUrl: './apps-mailbox.component.html',
    styleUrl: './apps-mailbox.component.scss'
})
export class AppsMailboxComponent implements OnInit {
  messageCount: {
    drafts: number;
    spam: number;
    trash: number;
    important: number;
    scheduled: number;
    sent: number;
    starred: number;
    inbox: number;
  } = {
      drafts: 0,
      spam: 0,
      trash: 0,
      important: 0,
      scheduled: 0,
      sent: 0,
      starred: 0,
      inbox: 0
    };
  userEmail = [
    {
      image: 'assets/images/brands/img-04.png',
      name: 'SRBThemes Account',
      email: 'shopia@SRBThemes.com'
    },
    {
      image: "assets/images/brands/img-04.png",
      name: "Pixel Account",
      email: "shopia@pixel.com"
    },
    {
      image: "assets/images/brands/img-05.png",
      name: "Domiex",
      email: "shopia@domiex.com"
    },
    {
      image: "assets/images/brands/img-09.png",
      name: "Global World",
      email: "world@global.com"
    }
  ]
  activeUserEmail!: UseEmail
  emailMenu = EmailMenuType
  selctedEmailMenu!: EmailMenuType;
  allEmail: AllEmail[] = [];
  getDataMenuWise: AllEmail[] = [];
  selectedEmail!: AllEmail | null;
  allDeletedArr!: number[];

  constructor(public restApiService: RestApiService, public modalService: ModalService) {
  }

  ngOnInit(): void {
    this.emailData()
  }

  setSelectedMenu(selectedMenu: EmailMenuType = EmailMenuType.Inbox) {
    this.selctedEmailMenu = selectedMenu;
    this.getInboxData()
  }

  setSelectedEmail(index: number = 0) {
    this.activeUserEmail = this.userEmail[index];
  }

  emailData() {
    this.restApiService.getEmailData().subscribe((data: any) => {
      this.allEmail = data;
      this.setSelectedMenu();
      this.getMessageCount();
      this.setSelectedEmail();
    });
  }

  getInboxData() {
    this.getDataMenuWise = this.allEmail.filter(x => x.type == this.selctedEmailMenu);
  }

  setSelectedItem(index: any) {
    this.selectedEmail = null;
    const data = this.getDataMenuWise[index];
    data.selected = true;
    this.selectedEmail = data;
  }

  getMessageCount() {
    this.messageCount = {
      drafts: 0,
      spam: 0,
      trash: 0,
      important: 0,
      scheduled: 0,
      sent: 0,
      starred: 0,
      inbox: 0
    }
    this.allEmail.forEach(email => {
      switch (email.type) {
        case this.emailMenu.Drafts:
          this.messageCount.drafts++;
          break;
        case this.emailMenu.Spam:
          this.messageCount.spam++;
          break;
        case this.emailMenu.Trash:
          this.messageCount.trash++;
          break;
        case this.emailMenu.Important:
          this.messageCount.important++;
          break;
        case this.emailMenu.Scheduled:
          this.messageCount.scheduled++;
          break;
        case this.emailMenu.Sent:
          this.messageCount.sent++;
          break;
        case this.emailMenu.Starred:
          this.messageCount.starred++;
          break;
        case this.emailMenu.Inbox:
          this.messageCount.inbox++;
          break;
      }
    });
  }

  openComposeModal() {
    this.modalService.open(CompoceMailComponent, {id: this.allEmail.length + 1}, (res) => {
      if (res) {
        this.allEmail.unshift(res);
        this.setSelectedMenu(EmailMenuType.Sent);
        this.getMessageCount();
        this.setSelectedEmail();
      }
    })
  }

  delSelectedMail(event: any) {
    const arr = [];
    arr.push(event);

    this.delMail(arr, true)
  }

  closeSidePannal(event: any) {
    if (event) {
      this.selectedEmail = null;
    }
  }

  delMail(delMailIds: number[], isFromAction = false) {
    this.allEmail = this.allEmail.filter(email => !delMailIds.includes(email.id));
    this.setSelectedMenu(this.selctedEmailMenu);
    this.getMessageCount();
    this.setSelectedEmail();

    if (isFromAction) {
      if (this.getDataMenuWise.length > 0) {
        this.setSelectedItem(0);
      } else {
        this.selectedEmail = null;
      }
    }
  }
}

