import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

@Component({
    selector: 'app-apps-calender-date-nav-link',
    imports: [FullCalendarModule, PageTitleComponent],
    templateUrl: './apps-calender-date-nav-link.component.html',
    styleUrl: './apps-calender-date-nav-link.component.scss'
})
export class AppsCalenderDateNavLinkComponent {

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin
    ],
    editable: true,
    navLinks: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: 'https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
  };

}
