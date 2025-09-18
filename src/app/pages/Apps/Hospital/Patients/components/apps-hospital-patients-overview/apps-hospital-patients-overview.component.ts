import { Component } from '@angular/core';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ReportsTableComponent } from './componate/reports-table/reports-table.component';
import { MedicineTableComponent } from './componate/medicine-table/medicine-table.component';
import { AddAppointmentsModalComponent } from './model/add-appointments-modal/add-appointments-modal.component';
import { AppointmentsTableComponent } from './componate/appointments-table/appointments-table.component';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-apps-hospital-patients-overview',
    imports: [
        PageTitleComponent,
        SimplebarAngularModule,
        ReportsTableComponent,
        MedicineTableComponent,
        AppointmentsTableComponent,
        LucideAngularModule,
    ],
    templateUrl: './apps-hospital-patients-overview.component.html',
    styleUrl: './apps-hospital-patients-overview.component.scss'
})
export class AppsHospitalPatientsOverviewComponent {
  options = { autoHide: true };
}
