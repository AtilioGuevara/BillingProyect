import { Component, Input } from '@angular/core';
import { DrawerService } from '../../../../Core/service/Drawer/drawer.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-half-screen-drawer',
  imports: [LucideAngularModule],
  templateUrl: './half-screen-drawer.component.html',
  styleUrl: './half-screen-drawer.component.scss'
})
export class HalfScreenDrawerComponent {
  @Input() config: any;

  constructor(private drawerService: DrawerService) { }

  ngOnInit() {
    // console.log(this.config);
  }

  closeDrawer() {
    this.drawerService.close();
  }

}
