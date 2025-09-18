import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import {
  CalendarOptions,
  EventApi,
  EventClickArg,
} from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { OpenAddEditModelComponent } from './open-add-edit-model/open-add-edit-model.component';

export interface EventExtendedProps {
  guests?: string[];
  location: string;
}

export interface Event {
  id: string;
  title: string;
  end: Date;
  start: Date;
  eventype?: number;
  time: string;
  extendedProps: EventExtendedProps;
  classNames: string[];
}

export enum EventsType {
  Events,
  Personal,
  Meeting,
  FestivalFunction,
}

@Component({
    selector: 'app-apps-calender-default',
    imports: [PageTitleComponent, FullCalendarModule, LucideAngularModule],
    templateUrl: './apps-calender-default.component.html',
    styleUrl: './apps-calender-default.component.scss'
})
export class AppsCalenderDefaultComponent {
  @ViewChild(FullCalendarComponent) calendarComponent!: FullCalendarComponent;

  constructor(private modalService: ModalService) { }
  EventsType = EventsType;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();

  eventsList: Event[] = [
    {
      id: '1',
      title: 'Meeting',
      time: '12:00',
      eventype: EventsType.Personal,
      end: new Date(this.currentYear, this.currentMonth, 11),
      start: new Date(this.currentYear, this.currentMonth, 10),
      extendedProps: {
        guests: ['assets/images/avatar/user-9.png'],
        location: 'surat',
      },
      classNames: this.getClassByEvent(EventsType.Personal),
    },
    {
      id: '2',
      title: 'Update Weekly',
      time: '12:00',
      eventype: EventsType.Personal,
      end: new Date(this.currentYear, this.currentMonth, 3),
      start: new Date(this.currentYear, this.currentMonth, 15),
      extendedProps: { location: 'surat' },
      classNames: this.getClassByEvent(EventsType.Personal),
    },
    {
      id: '3',
      title: 'Family Dinner',
      time: '12:00',
      end: new Date(this.currentYear, this.currentMonth, 2),
      start: new Date(this.currentYear, this.currentMonth, 31),
      extendedProps: { location: 'surat' },
      classNames: this.getClassByEvent(EventsType.Events),
      eventype: EventsType.Events,
    },
    {
      id: '4',
      title: 'School Reunion',
      time: '12:00',
      end: new Date(this.currentYear, this.currentMonth, 5),
      start: new Date(this.currentYear, this.currentMonth, 19),
      extendedProps: { location: 'surat' },
      classNames: this.getClassByEvent(EventsType.Meeting),
      eventype: EventsType.Meeting,
    },
    {
      id: '5',
      title: 'Holiday Tour',
      time: '12:00',
      end: new Date(this.currentYear, this.currentMonth, 1),
      start: new Date(this.currentYear, this.currentMonth, 1),
      extendedProps: { location: 'surat' },
      classNames: this.getClassByEvent(EventsType.FestivalFunction),
      eventype: EventsType.FestivalFunction,
    },
    {
      id: '6',
      title: 'Meeting',
      time: '12:00',
      end: new Date(this.currentYear, this.currentMonth, 6),
      start: new Date(this.currentYear, this.currentMonth, 21),
      extendedProps: { location: 'surat' },
      classNames: this.getClassByEvent(EventsType.Meeting),
      eventype: EventsType.Meeting,
    },
    {
      id: '7',
      title: 'Marrige Function',
      time: '12:00',
      end: new Date(this.currentYear, this.currentMonth, 6),
      start: new Date(this.currentYear, this.currentMonth, 21),
      extendedProps: { location: 'surat' },
      classNames: this.getClassByEvent(EventsType.Events),
      eventype: EventsType.Events,
    },
  ];

  ngOnInit() {
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    editable: true,
    droppable: true,
    events: this.eventsList,
    dateClick: (info: DateClickArg) => this.handleDateClick(info),
    eventClick: (info: EventClickArg) => this.editEvent(info.event),
    eventContent: (info: any) => this.renderEventContent(info),
  };

  handleDateClick(arg: DateClickArg) {

    const eventDetails = {
      start: this.formatDate(new Date(arg.dateStr)),
      end: this.formatDate(this.addDays(new Date(arg.dateStr), 1)),
    };

    this.openAddEditEventModel(eventDetails);
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  editEvent(event: EventApi) {
    const eventDetails = {
      id: event.id,
      title: event.title,
      start: this.formatDate(event.start ? event.start : new Date()),
      end: this.formatDate(event.end ? event.end : new Date()),
      extendedProps: event.extendedProps,
      classNames: event.classNames,
    };

    this.openAddEditEventModel(eventDetails);
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  renderEventContent(info: any) {

    // Create the container for the event content
    const containerEl = document.createElement('div');

    // Create the title element
    const titleEl = document.createElement('div');
    titleEl.classList.add('fc-event-title', 'grow');
    titleEl.innerText = info.event.title;

    // Append title to container
    containerEl.appendChild(titleEl);

    // Check if there are guests and create guest elements
    if (info.event.extendedProps.guests) {
      const guestsEl = document.createElement('div');
      guestsEl.classList.add('fc-event-guests', '-space-x-3', 'flex');

      // Loop through the guests and add their images
      info.event.extendedProps.guests.forEach((guest: string) => {
        const imgEl = document.createElement('img');
        imgEl.src = guest;
        imgEl.alt = 'Guest Avatar';
        imgEl.style.width = '20px';
        imgEl.style.height = '20px';
        imgEl.style.borderRadius = '50%';
        imgEl.style.marginRight = '5px';

        guestsEl.appendChild(imgEl);
      });

      containerEl.appendChild(guestsEl);
    }

    containerEl.classList.add('flex', 'cursor-pointer');

    return { domNodes: [containerEl] };
  }

  getClassByEvent(eventType: EventsType): string[] {
    switch (eventType) {
      case EventsType.Events:
        return ['bg-purple-500', 'hover:bg-purple-500', 'text-purple-50', 'p-2'];
      case EventsType.Personal:
        return ['bg-primary-500', 'hover:bg-primary-500', 'text-primary-50', 'p-2'];
      case EventsType.Meeting:
        return ['bg-green-500', 'hover:bg-green-500', 'text-green-50', 'p-2'];
      case EventsType.FestivalFunction:
        return ['bg-sky-500', 'hover:bg-sky-500', 'text-sky-50', 'p-2'];
      default:
        return ['bg-sky-500', 'hover:bg-sky-500', 'text-sky-50', 'p-2']; // Default classes
    }
  }

  openAddEditEventModel(data: any) {
    this.modalService.open(OpenAddEditModelComponent, data, (data) => {
      if (data) {
        this.prepareEvent(data);
      }
    });
  }

  prepareEvent(input: any) {
    const existingEvent = this.calendarComponent
      .getApi()
      .getEventById(input.id);

    if (existingEvent) {
      existingEvent.setProp('title', input.title);
      existingEvent.setStart(new Date(input.start));
      existingEvent.setEnd(input.end ? new Date(input.end) : null);
      existingEvent.setProp('classNames', this.getClassByEvent(input.eventype));

      // Update extended properties
      existingEvent.setExtendedProp('location', input.location);
      existingEvent.setExtendedProp('guests', input.guests);
      existingEvent.setExtendedProp('time', input.time);
      existingEvent.setExtendedProp('eventype', input.eventype);
    } else {
      this.calendarComponent.getApi().addEvent({
        id: (this.calendarComponent.getApi().getEvents().length + 1).toString(),
        title: input.title,
        start: input.start ? new Date(input.start) : new Date(),
        end: input.end ? new Date(input.end) : new Date(),
        classNames: this.getClassByEvent(input.eventype),
        extendedProps: {
          location: input.location,
          guests: input.guests,
          eventype: input.eventype,
          time: input.time,
        },
      });
    }
  }

}
