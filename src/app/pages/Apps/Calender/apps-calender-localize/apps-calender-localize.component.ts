import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgSelectModule } from '@ng-select/ng-select';
import allLocales from '@fullcalendar/core/locales-all';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-apps-calender-localize',
    imports: [FullCalendarModule, PageTitleComponent, NgSelectModule, ReactiveFormsModule],
    templateUrl: './apps-calender-localize.component.html',
    styleUrl: './apps-calender-localize.component.scss'
})
export class AppsCalenderLocalizeComponent {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent; 

  langControl = new FormControl('en-au');

  calendarOptions: CalendarOptions = {
    timeZone: 'America/New_York',
    plugins: [dayGridPlugin, interactionPlugin],
    locales: allLocales,
    locale: 'en-au'
  };

  options= [
    { label: "English (EN-AU)", value: "en-au" },
    { label: "Arabic (AR)", value: "ar" },
    { label: "German (DE)", value: "de" },
    { label: "Russian (RU)", value: "ru" },
    { label: "French (FR)", value: "fr" },
    { label: "Italian (IT)", value: "it" },
    { label: "Danish (DA)", value: "da" },
    { label: "Chinese (ZH)", value: "zh" },
    { label: "Korean (KO)", value: "ko" },
    { label: "Greek (EL)", value: "el" },
    { label: "Finnish (FI)", value: "fi" },
    { label: "Persian (FA)", value: "fa" },
    { label: "Catalan, Valencian (CA)", value: "ca" },
  ]

  ngOnInit() {
  }

  onChangeLang() {
    const selectedLocale = this.langControl.value ?? 'en-au'; 
    if (this.calendarComponent) { 
      this.calendarComponent.getApi().setOption('locale', selectedLocale)
    }

  }
}
