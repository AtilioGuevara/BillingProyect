import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-call-modal',
    imports: [LucideAngularModule],
    templateUrl: './call-modal.component.html',
    styleUrl: './call-modal.component.scss'
})
export class CallModalComponent {
  @Input() config: any; // Accept the selected deal data here

}
