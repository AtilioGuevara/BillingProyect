import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tools-apps-modal',
    imports: [LucideAngularModule, FormsModule, CommonModule],
    templateUrl: './tools-apps-modal.component.html',
    styleUrl: './tools-apps-modal.component.scss'
})
export class ToolsAppsModalComponent {
  searchTerm: string = '';
  constructor(private modalService: ModalService) {}

  closeaToolsModal() {
    this.modalService.close();
  }

  toolsApps = [
    { id: 1, name: 'X Twitter', img: 'assets/images/brands/img-30.png' },
    { id: 2, name: 'Slack', img: 'assets/images/brands/img-29.png' },
    { id: 3, name: 'GitHub', img: 'assets/images/brands/img-26.png' },
    { id: 4, name: 'YouTube', img: 'assets/images/brands/img-15.png' },
    { id: 5, name: 'Windows 11', img: 'assets/images/brands/img-06.png' },
    { id: 6, name: 'PayPal', img: 'assets/images/brands/img-20.png' },
    { id: 7, name: 'Twitch', img: 'assets/images/brands/img-11.png' },
    { id: 8, name: 'Snapchat', img: 'assets/images/brands/img-31.png' },
    { id: 9, name: 'Linux', img: 'assets/images/brands/img-04.png' },
  ];

  get filteredToolsApps() {
    return this.toolsApps.filter((tool) =>
      tool.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
