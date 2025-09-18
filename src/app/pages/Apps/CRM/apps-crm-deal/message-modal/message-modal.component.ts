import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
    selector: 'app-message-modal',
    imports: [LucideAngularModule, CommonModule, SimplebarAngularModule],
    templateUrl: './message-modal.component.html',
    styleUrl: './message-modal.component.scss'
})
export class MessageModalComponent {
  @Input() config: any; // Accept the selected deal data here
}
