import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { DomixPaginationComponent } from '../../../../../../componate/domix-pagination/domix-pagination.component';
import { DomixDropdownModule } from '../../../../../../module/domix dropdown/domix-dropdown.module';
import { RestApiService } from '../../../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { ColDefs, DomixGridTestComponent } from '../../../../../../componate/domix-grid-test/domix-grid-test.component';
import { DeleteModalComponent } from '../../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
export interface Attendance {
  date: string;
  checkInTime: string;
  checkOutTime: string;
  status: string;
  workedTime?: string;
  differenceTime?: string;
}

@Component({
    selector: 'app-apps-hospital-staff-attendance',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
    ],
    templateUrl: './apps-hospital-staff-attendance.component.html',
    styleUrl: './apps-hospital-staff-attendance.component.scss'
})
export class AppsHospitalStaffAttendanceComponent extends DomixGridTestComponent {
  allAttendance: Attendance[] = [];
  hasHeaderCheckbox = false;
  shiftTime = { hours: 9, minutes: 0 };

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private modalService: ModalService
  ) {
    super(domiex);
    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);
  }

  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getallAttendance().subscribe((data: any) => {
      this.allAttendance = data.map((report: Attendance) => {
        const checkIn = this.parseTime(report.checkInTime);
        const checkOut = this.parseTime(report.checkOutTime);
        const workedTime = this.calculateWorkedTime(checkIn, checkOut);
        report.workedTime = this.formatTime(workedTime);

        const difference = this.calculateDifferenceTime(
          workedTime,
          this.shiftTime
        );
        report.differenceTime = this.formatTime(difference);

        return report;
      });
      this.gridData = this.allAttendance;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  parseTime(time: string) {
    const [timeString, period] = time.split(' ');
    let [hours, minutes] = timeString.split(':').map(Number);
    if (period === 'pm' && hours < 12) hours += 12;
    if (period === 'am' && hours === 12) hours = 0;
    return { hours, minutes };
  }

  formatTime(time: { hours: number; minutes: number }) {
    const hours = String(time.hours).padStart(2, '0');
    const minutes = String(time.minutes).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  calculateWorkedTime(
    checkIn: { hours: number; minutes: number },
    checkOut: { hours: number; minutes: number }
  ) {
    let hours = checkOut.hours - checkIn.hours;
    let minutes = checkOut.minutes - checkIn.minutes;
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) hours += 24;
    return { hours, minutes };
  }

  calculateDifferenceTime(
    workedTime: { hours: number; minutes: number },
    shiftTime: { hours: number; minutes: number }
  ) {
    let hours = workedTime.hours - shiftTime.hours;
    let minutes = workedTime.minutes - shiftTime.minutes;
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    return { hours, minutes };
  }

  columnDefs: ColDefs[] = [
    {
      field: 'date',
      headerName: 'Date',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      headerName: 'Shift Time',
      sortable: false,
    },
    {
      field: 'checkInTime',
      headerName: 'Check In',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'checkOutTime',
      headerName: 'Check Out',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'workedTime',
      headerName: 'Worked Time',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'checkOutTime',
      headerName: 'Difference',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'checkOutTime',
      headerName: 'Status',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ];
  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.gridData.splice(index, 1);
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }
}
