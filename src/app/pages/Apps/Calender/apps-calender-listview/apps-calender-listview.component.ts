import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import listPlugin from '@fullcalendar/list';


@Component({
    selector: 'app-apps-calender-listview',
    imports: [PageTitleComponent, FullCalendarModule],
    templateUrl: './apps-calender-listview.component.html',
    styleUrl: './apps-calender-listview.component.scss'
})
export class AppsCalenderListviewComponent {
  calendarOptions:  CalendarOptions = {
    plugins: [
      listPlugin,
    ],
    editable: true,
    initialView: 'listWeek',
    events: [
      { title: 'Meeting', start: new Date() },
      { title: 'Update Weekly', start: new Date() }
    ]
  };
}
