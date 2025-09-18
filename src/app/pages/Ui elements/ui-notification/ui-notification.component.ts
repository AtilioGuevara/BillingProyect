import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

type ToastPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'contentToast';
interface Notice {
  id: number;
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}
@Component({
    selector: 'app-ui-notification',
    imports: [PageTitleComponent, CommonModule],
    templateUrl: './ui-notification.component.html',
    styleUrl: './ui-notification.component.scss'
})
export class UiNotificationComponent {
  

  tostAlerts: Record<ToastPosition, boolean> = {
    topLeft: false,
    topCenter: false,
    topRight: false,
    bottomLeft: false,
    bottomCenter: false,
    bottomRight: false,
    contentToast: false
  };

  notices: Notice[] = [];
  visible: Notice[] = [];

  private idCounter = 0;

  addNotice(type: Notice['type'], text: string) {
    const id = ++this.idCounter;
    const notice: Notice = { id, type, text };
    this.notices.push(notice);
    this.visible.push(notice);

    setTimeout(() => this.removeNotice(id), 1000);
  }

  removeNotice(id: number) {
    this.visible = this.visible.filter(notice => notice.id !== id);
    setTimeout(() => {
      this.notices = this.notices.filter(notice => notice.id !== id);
    }, 200); // Transition delay
  }

  openNotifaction(key: ToastPosition) {
    this.tostAlerts[key] = true;
    setTimeout(() => {
      this.tostAlerts[key] = false;
    }, 1500);
  }

}
