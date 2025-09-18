import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { SimplebarAngularModule } from 'simplebar-angular';
export interface AllScheduleDate {
  date: string,
  name: string,
  specialty: string,
  notes: string,
  time: string,
  color: string
}
@Component({
    selector: 'app-apps-hospital-doctor-schedule',
    imports: [PageTitleComponent, CommonModule, DomixDropdownModule, SimplebarAngularModule],
    templateUrl: './apps-hospital-doctor-schedule.component.html',
    styleUrl: './apps-hospital-doctor-schedule.component.scss'
})
export class AppsHospitalDoctorScheduleComponent {

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  selectedMonth: number;
  selectedYear: number;
  todayDay: number;
  todayMonth: number;
  todayYear: number;
  selectedDate: string;
  dates: any[] = [];
  appointments: AllScheduleDate[] = [];
  selectedAppointments: any[] = [];

  defaultData : AllScheduleDate[] = []

  constructor(private apiService: RestApiService) {
    const today = new Date();
    this.selectedMonth = today.getMonth();
    this.selectedYear = today.getFullYear();
    this.todayDay = today.getDate();
    this.todayMonth = today.getMonth();
    this.todayYear = today.getFullYear();

    this.selectedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;


    this.defaultData = [{
      date: this.selectedDate,
      name: "Robert Taylor",
      specialty: "Endocrinology",
      notes: "Diabetes check-up",
      time: "02:30PM - 03:30PM",
      color: "green-500"
    },
    {
      date: this.selectedDate,
      name: "Karen Martinez",
      specialty: "Pulmonology",
      notes: "Lung function test",
      time: "11:30AM - 12:30PM",
      color: "primary-500"
    },
    {
      date: this.selectedDate,
      name: "Daniel Adams",
      specialty: "Rheumatology",
      notes: "Arthritis evaluation",
      time: "03:00PM - 04:00PM",
      color: "purple-500"
    },
    {
      date: this.selectedDate,
      name: "Linda Rodriguez",
      specialty: "Nephrology",
      notes: "Kidney function test",
      time: "01:00PM - 02:00PM",
      color: "yellow-500"
    }]
  }

  ngOnInit() {
    this.fetchAppointments();
  }

  generateDates() {
    const year = this.selectedYear;
    const month = this.selectedMonth;
    const date = new Date(year, month, 1);
    this.dates = [];
    while (date.getMonth() === month) {
      this.dates.push({
        day: date.getDate(),
        name: this.days[date.getDay()],
        formattedDate: this.formatDate(date),
        isToday: date.getDate() === this.todayDay && month === this.todayMonth && year === this.todayYear,
        selectedDateString: (`${this.selectedYear}-${String(this.selectedMonth + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`).toString(),
      });
      date.setDate(date.getDate() + 1);
    }


    this.getApptDateWise(this.selectedDate);
  }

  fetchAppointments() {
    this.apiService.getScheduleList().subscribe(data => {
      this.appointments = [...data, ...this.defaultData]; 
      console.log(this.appointments);
      
      this.generateDates();
    })
  }

  selectMonth(index: number) {
    this.selectedMonth = index;

    const today = new Date(); // Define today inside the method
    this.selectedDate = `${today.getFullYear()}-${String(this.selectedMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    this.generateDates();
  }

  getApptDateWise(date: any) {
    this.selectedAppointments = []

    const filterData = this.appointments.filter(appointment => appointment.date === date);

    this.selectedAppointments = filterData.map(appointment => {
      return {
        ...appointment,
        day: this.getDate(appointment.date),
        monthYear: this.formatDate(new Date(appointment.date)),
      }
    })

    this.selectedDate = date;
  }

  formatDate(date: Date) {
    return `${this.months[date.getMonth()]}, ${date.getFullYear()}`;
  }

  getDate(date: string) {
    return new Date(date).getDate();
  }

}