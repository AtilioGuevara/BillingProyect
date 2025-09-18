import { Component, Input } from '@angular/core';
import { DrawerService } from '../../../../Core/service/Drawer/drawer.service';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
    selector: 'app-small-drawer',
    imports: [SimplebarAngularModule],
    templateUrl: './small-drawer.component.html',
    styleUrl: './small-drawer.component.scss'
})
export class SmallDrawerComponent {
  @Input() config: any;
  options = { autoHide: true };

  constructor(private drawerService: DrawerService) { }

  ngOnInit() {
    // console.log(this.config);
  }

  closeDrawer() {
    this.drawerService.close();
  }

}
