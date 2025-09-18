import { Component, Input } from '@angular/core';
import { DrawerService } from '../../../../Core/service/Drawer/drawer.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-large-drawer',
  imports: [LucideAngularModule],
  templateUrl: './large-drawer.component.html',
  styleUrl: './large-drawer.component.scss'
})
export class LargeDrawerComponent {
  @Input() config: any;

  constructor(private drawerService: DrawerService) { }

  ngOnInit() {
    // console.log(this.config);
  }

  closeDrawer() {
    this.drawerService.close();
  }

}
