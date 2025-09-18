import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../components/apps-hospital-appointments-book/apps-hospital-appointments-book.component';

@Injectable({
  providedIn: 'root',
})
export class AppointmentBooksService {
  private appointmentBook: Appointment[] = [
    {
      image: 'assets/images/avatar/user-14.png',
      patientName: 'Laura Anderson',
      email: 'laura.anderson@example.com',
      phoneNumber: '9876556473',
      date: '2024-09-24',
      startTime: '11:20AM',
      endTime: '12:30PM',
      doctorName: 'Dr. Robert Harris',
      treatment: 'Heart check-up',
      appointmentsId: 'abook_01',
      status: 'Pending',
    },
    {
      image: 'assets/images/avatar/user-15.png',
      patientName: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      phoneNumber: '9876556474',
      date: '2024-09-24',
      startTime: '12:35PM',
      endTime: '01:40PM',
      doctorName: 'Dr. Emily Carter',
      treatment: 'Kidney function test',
      appointmentsId: 'abook_02',
      status: 'Completed',
    },
    {
      image: 'assets/images/avatar/user-17.png',
      patientName: 'Sarah White',
      email: 'sarah.white@example.com',
      phoneNumber: '9876556475',
      date: '2024-09-24',
      startTime: '01:50PM',
      endTime: '02:20PM',
      doctorName: 'Dr. Sarah Evans',
      treatment: 'Eye examination',
      appointmentsId: 'abook_03',
      status: 'Confirmed',
    },
    {
      image: 'assets/images/avatar/user-18.png',
      patientName: 'Michael Brown',
      email: 'michael.brown@example.com',
      phoneNumber: '9876556476',
      date: '2024-09-24',
      startTime: '02:30PM',
      endTime: '03:00PM',
      doctorName: 'Dr. Michael Johnson',
      treatment: 'Diabetes check-up',
      appointmentsId: 'abook_04',
      status: 'Cancel',
    },
    {
      image: 'assets/images/avatar/user-19.png',
      patientName: 'David Wilson',
      email: 'david.wilson@example.com',
      phoneNumber: '9876556477',
      date: '2024-09-24',
      startTime: '03:10PM',
      endTime: '03:40PM',
      doctorName: 'Dr. Emily Carter',
      treatment: 'Skin condition evaluation',
      appointmentsId: 'abook_05',
      status: 'New',
    },
    {
      image: 'assets/images/avatar/user-20.png',
      patientName: 'Jessica Lee',
      email: 'jessica.lee@example.com',
      phoneNumber: '9876556478',
      date: '2024-09-24',
      startTime: '03:50PM',
      endTime: '04:20PM',
      doctorName: 'Dr. Michael Johnson',
      treatment: 'Annual physical exam',
      appointmentsId: 'abook_06',
      status: 'Confirmed',
    },
    {
      image: 'assets/images/avatar/user-21.png',
      patientName: 'Paul Martinez',
      email: 'paul.martinez@example.com',
      phoneNumber: '9876556479',
      date: '2024-09-24',
      startTime: '04:30PM',
      endTime: '05:00PM',
      doctorName: 'Dr. Robert Harris',
      treatment: 'Orthopedic consultation',
      appointmentsId: 'abook_07',
      status: 'Pending',
    },
    {
      image: 'assets/images/avatar/user-14.png',
      patientName: 'Sarah White',
      email: 'sarah.white@example.com',
      phoneNumber: '9876556470',
      date: '2024-06-07',
      startTime: '02:00PM',
      endTime: '03:00PM',
      doctorName: 'Dr. Michael Johnson',
      treatment: 'Routine check-up',
      appointmentsId: 'abook_01',
      status: 'Pending',
    },
    {
      image: 'assets/images/avatar/user-14.png',
      patientName: 'Daniel Adams',
      email: 'daniel.adams@example.com',
      phoneNumber: '9876556471',
      date: '2024-06-08',
      startTime: '03:00PM',
      endTime: '04:00PM',
      doctorName: 'Dr. Sarah Evans',
      treatment: 'Skin condition evaluation',
      appointmentsId: 'abook_02',
      status: 'New',
    },
    {
      image: 'assets/images/avatar/user-17.png',
      patientName: 'Olivia Lewis',
      email: 'olivia.lewis@example.com',
      phoneNumber: '9876556472',
      date: '2024-06-09',
      startTime: '11:30AM',
      endTime: '12:30PM',
      doctorName: 'Dr. Sarah Evans',
      treatment: 'Vision check-up',
      appointmentsId: 'abook_03',
      status: 'New',
    },
    {
      image: 'assets/images/avatar/user-20.png',
      patientName: 'James Brown',
      email: 'james.brown@example.com',
      phoneNumber: '9876556473',
      date: '2024-06-10',
      startTime: '10:00AM',
      endTime: '11:00AM',
      doctorName: 'Dr. Emily Carter',
      treatment: 'Dental cleaning',
      appointmentsId: 'abook_04',
      status: 'Pending',
    },
    {
      image: 'assets/images/avatar/user-18.png',
      patientName: 'Linda Taylor',
      email: 'linda.taylor@example.com',
      phoneNumber: '9876556474',
      date: '2024-06-11',
      startTime: '01:00PM',
      endTime: '02:00PM',
      doctorName: 'Dr. Robert Harris',
      treatment: 'Cardiology consultation',
      appointmentsId: 'abook_05',
      status: 'Confirmed',
    },
    {
      image: 'assets/images/avatar/user-17.png',
      patientName: 'Sophia Martinez',
      email: 'sophia.martinez@example.com',
      phoneNumber: '9876556475',
      date: '2024-06-12',
      startTime: '09:00AM',
      endTime: '10:00AM',
      doctorName: 'Dr. Michael Johnson',
      treatment: 'Blood test',
      appointmentsId: 'abook_06',
      status: 'Completed',
    },
    {
      image: 'assets/images/avatar/user-14.png',
      patientName: 'Liam Anderson',
      email: 'liam.anderson@example.com',
      phoneNumber: '9876556476',
      date: '2024-06-13',
      startTime: '11:00AM',
      endTime: '12:00PM',
      doctorName: 'Dr. Sarah Evans',
      treatment: 'Skin biopsy',
      appointmentsId: 'abook_07',
      status: 'Pending',
    },
    {
      image: 'assets/images/avatar/user-20.png',
      patientName: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phoneNumber: '9876556477',
      date: '2024-06-14',
      startTime: '02:00PM',
      endTime: '03:00PM',
      doctorName: 'Dr. Emily Carter',
      treatment: 'Orthopedic consultation',
      appointmentsId: 'abook_08',
      status: 'Confirmed',
    },
    {
      image: 'assets/images/avatar/user-15.png',
      patientName: 'Noah Davis',
      email: 'noah.davis@example.com',
      phoneNumber: '9876556478',
      date: '2024-06-15',
      startTime: '01:00PM',
      endTime: '02:00PM',
      doctorName: 'Dr. Robert Harris',
      treatment: 'Heart check-up',
      appointmentsId: 'abook_09',
      status: 'New',
    },
    {
      image: 'assets/images/avatar/user-23.png',
      patientName: 'Ava Johnson',
      email: 'ava.johnson@example.com',
      phoneNumber: '9876556479',
      date: '2024-06-16',
      startTime: '03:00PM',
      endTime: '04:00PM',
      doctorName: 'Dr. Michael Johnson',
      treatment: 'Physical therapy',
      appointmentsId: 'abook_10',
      status: 'Pending',
    },
  ];

  constructor() {}

  getAppointmentBook(): Observable<Appointment[]> {
    return of(this.appointmentBook);
  }

  addAppointmentBook(AppointmentBook: Appointment): Observable<Appointment> {
    if (Array.isArray(this.appointmentBook)) {
      this.appointmentBook = [AppointmentBook, ...this.appointmentBook];
    }
    return of(AppointmentBook);
  }

  updateAppointmentBook(
    updatedappointmentBook: Appointment
  ): Observable<Appointment> {

    const updatedAppointmentBooks = this.appointmentBook.map(
      (appointmentBook) =>
        appointmentBook.appointmentsId === updatedappointmentBook.appointmentsId
          ? updatedappointmentBook
          : appointmentBook
    );

    this.appointmentBook = [...updatedAppointmentBooks];

    return of(updatedappointmentBook);
  }

  deleteAppointmentBook(id: string): Observable<void> {
    this.appointmentBook = this.appointmentBook.filter(
      (s) => s.appointmentsId !== id
    );
    return of(void 0);
  }
}
