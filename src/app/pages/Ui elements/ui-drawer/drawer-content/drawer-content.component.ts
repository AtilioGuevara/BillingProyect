import { Component, Input } from '@angular/core';
import { DrawerService } from '../../../../Core/service/Drawer/drawer.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-drawer-content',
    imports: [LucideAngularModule, CommonModule],
    templateUrl: './drawer-content.component.html',
    styleUrl: './drawer-content.component.scss'
})
export class DrawerContentComponent {
  @Input() config: any;

  constructor(private drawerService: DrawerService) { }

  ngOnInit() {
    // console.log(this.config);
  }

  closeDrawer() {
    this.drawerService.close();
  }

}
