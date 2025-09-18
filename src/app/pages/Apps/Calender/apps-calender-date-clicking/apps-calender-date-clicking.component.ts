import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-apps-calender-date-clicking',
  imports: [PageTitleComponent, FullCalendarModule],
  templateUrl: './apps-calender-date-clicking.component.html',
  styleUrl: './apps-calender-date-clicking.component.scss'
})
export class AppsCalenderDateClickingComponent {
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    eventClick: (info) => {
      alert('Event clicked: ' + info.event.title);
    },
    select: (info) => {
      alert('Selected: ' + info.startStr + ' to ' + info.endStr);
    }
  };
}
