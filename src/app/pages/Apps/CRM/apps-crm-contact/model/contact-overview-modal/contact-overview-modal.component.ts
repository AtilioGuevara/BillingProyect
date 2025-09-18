import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-contact-overview-modal',
    imports: [LucideAngularModule],
    templateUrl: './contact-overview-modal.component.html',
    styleUrl: './contact-overview-modal.component.scss'
})
export class ContactOverviewModalComponent {
  @Input() config?: any;

  contactOverviewModal() {}

  ngOnInit() {
  }
}
