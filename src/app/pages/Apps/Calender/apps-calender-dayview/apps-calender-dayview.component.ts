import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-apps-calender-dayview',
    imports: [PageTitleComponent, FullCalendarModule],
    templateUrl: './apps-calender-dayview.component.html',
    styleUrl: './apps-calender-dayview.component.scss'
})
export class AppsCalenderDayviewComponent {

  calendarOptions: CalendarOptions = {
    timeZone: 'America/New_York',
    plugins: [
      dayGridPlugin,
    ],
    initialView: 'dayGridWeek',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridWeek,dayGridDay'
    }
  };
}
