import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LucideAngularModule } from 'lucide-angular';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
    selector: 'app-apps-calender-weeknumber',
    imports: [PageTitleComponent, FullCalendarModule, LucideAngularModule],
    templateUrl: './apps-calender-weeknumber.component.html',
    styleUrl: './apps-calender-weeknumber.component.scss'
})
export class AppsCalenderWeeknumberComponent {

  calendarOptions: CalendarOptions = {
    timeZone: 'America/New_York',
    plugins: [dayGridPlugin, interactionPlugin],
    weekNumbers: true,
  };

}
