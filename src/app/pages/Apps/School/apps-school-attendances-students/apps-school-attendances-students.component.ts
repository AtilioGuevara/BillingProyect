import { Component } from '@angular/core';
import { CountUpModule } from 'ngx-countup';

import { LucideAngularModule } from 'lucide-angular';
import { PageTitleComponent } from "../../../../layouts/page-title/page-title.component";

@Component({
    selector: 'app-apps-school-attendances-students',
    imports: [CountUpModule, LucideAngularModule, PageTitleComponent],
    templateUrl: './apps-school-attendances-students.component.html',
    styleUrl: './apps-school-attendances-students.component.scss'
})
export class AppsSchoolAttendancesStudentsComponent  {

}
