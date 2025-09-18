import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-file-tree',
    imports: [CommonModule],
    templateUrl: './file-tree.component.html',
    styleUrl: './file-tree.component.scss'
})
export class FileTreeComponent {
  @Input() levels: any[] = [];

  toggleLevel(item: any, event: Event) {
    event.preventDefault();
    item.expanded = !item.expanded;
  }

}
