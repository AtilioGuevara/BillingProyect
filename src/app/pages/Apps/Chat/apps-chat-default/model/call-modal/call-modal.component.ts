import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-call-modal',
    imports: [LucideAngularModule, CommonModule],
    templateUrl: './call-modal.component.html',
    styleUrl: './call-modal.component.scss'
})
export class CallModalComponent {
  @Input() config: any;
  isCalling = false;
  callDuration = 0;

  ngOnInIt(){
    console.log(this.config);
  }

  formatDuration(seconds: number): string {
    // Specified parameter type
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  }
}
