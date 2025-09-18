import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { ShareProjectModalComponent } from '../share-project-modal/share-project-modal.component';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { LucideAngularModule } from 'lucide-angular';
import { DomixChartsComponent } from '../../../../componate/domix-charts/domix-charts.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomixTooltipModule } from '../../../../module/domix tooltip/domix-tooltip.module';

@Component({
    selector: 'app-apps-projects-files',
    imports: [
        PageTitleComponent,
        CommonModule,
        LucideAngularModule,
        DomixDropdownModule,
        RouterLink,
        DomixTooltipModule,
    ],
    templateUrl: './apps-projects-files.component.html',
    styleUrl: './apps-projects-files.component.scss'
})
export class AppsProjectsFilesComponent {
  currentUser = {
    name: 'Ina Payne',
    image: 'assets/images/avatar/user-5.png',
    role: 'Project Manager',
  };

  users = [
    {
      name: 'Ina Payne',
      image: 'assets/images/avatar/user-5.png',
      role: 'Project Manager',
    },
    {
      name: 'Robert Freeman',
      image: 'assets/images/avatar/user-11.png',
      role: 'Project Manager',
    },
    {
      name: 'Michelle Weigle',
      image: 'assets/images/avatar/user-13.png',
      role: 'Project Manager',
    },
    {
      name: 'William Keen',
      image: 'assets/images/avatar/user-14.png',
      role: 'Project Manager',
    },
  ];

  activeUser: { name: string; image: string; role: string } | null = null; // More specific type

  constructor(private modalService: ModalService) {}

  isActive(user: any): boolean {
    return this.activeUser === user;
  }

  selectUser(user: any): void {
    this.activeUser = user;
  }

  openModal() {
    this.modalService.open(ShareProjectModalComponent);
  }
  files = [
    { name: 'roadmap.pdf', size: 512, type: 'application/pdf' },
    { name: 'product-list.json', size: 6458, type: 'text/plain' },
    { name: 'authentication.jpg', size: 128, type: 'image/jpeg' },
    { name: 'pattern.png', size: 4518, type: 'image/png' },
    { name: 'domiex', size: 5412, type: 'application/x-rar-compressed' },
    { name: 'simple', size: 8741, type: 'text/plain' },
    { name: 'sound-icon.png', size: 4614, type: 'image/png' },
    { name: 'user-list.json', size: 97159, type: 'text/plain' },
    {
      name: 'documentation.docx',
      size: 256,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
  ];

  handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.files.push({ name: file.name, size: file.size, type: file.type });
      input.value = ''; // Clear the file input to allow the same file to be uploaded again if needed
    }
  }

  getIconClass(fileType: string | undefined): string {
    if (typeof fileType === 'undefined') {
      return 'ri-file-text-line'; // Default icon if fileType is undefined
    }
    switch (true) {
      case fileType.startsWith('image/'):
        return 'ri-file-image-line';
      case fileType === 'application/pdf':
        return 'ri-file-pdf-2-line';
      case fileType.startsWith('audio/'):
        return 'ri-file-music-line';
      case fileType.startsWith('video/'):
        return 'ri-file-2-line';
      case fileType === 'application/msword' ||
        fileType ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'ri-file-word-line';
      case fileType === 'application/vnd.ms-excel' ||
        fileType ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'ri-file-excel-line';
      case fileType === 'application/vnd.ms-powerpoint' ||
        fileType ===
          'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return 'ri-file-ppt-line';
      case fileType === 'application/zip' ||
        fileType === 'application/x-rar-compressed':
        return 'ri-file-zip-line';
      case fileType === 'text/plain':
        return 'ri-file-text-line';
      default:
        return 'ri-file-line';
    }
  }

  get fileCount(): number {
    return this.files.length;
  }

  formatSize(sizeInBytes: number): string {
    if (sizeInBytes >= 1024 * 1024) {
      return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return (sizeInBytes / 1024).toFixed(2) + ' KB';
    }
  }
}
