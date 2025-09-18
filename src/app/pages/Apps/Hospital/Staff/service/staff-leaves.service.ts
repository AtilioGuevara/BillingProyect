import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LeaveRequest } from '../components/apps-hospital-staff-leave-add/apps-hospital-staff-leave-add.component';

@Injectable({
  providedIn: 'root',
})
export class StaffLeaveService {
  private staffLeave: LeaveRequest[] = [
    {
      leaveType: 'Vacation',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '15 June, 2024',
      endDate: '21 June, 2024',
      totalDays: '7',
      reason: 'Family vacation',
      approvedBy: 'John Doe',
      dateRequested: '12 June, 2024',
      dateApproved: '14 June, 2024',
      status: 'Pending',
      staffleaveId: 'SL-2024001',
    },
    {
      leaveType: 'Sick',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '10 July, 2024',
      endDate: '14 July, 2024',
      totalDays: '7',
      reason: 'Medical',
      approvedBy: 'HR',
      dateRequested: '8 July, 2024',
      dateApproved: '9 July, 2024',
      status: 'Approved',
      staffleaveId: 'SL-2024002',
    },
    {
      leaveType: 'Personal',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '1 Aug, 2024',
      endDate: '3 Aug, 2024',
      totalDays: '7',
      reason: 'Personal reasons',
      approvedBy: 'Manager',
      dateRequested: '28 July, 2024',
      dateApproved: '30 July, 2024',
      status: 'Approved',
      staffleaveId: 'SL-2024003',
    },
    {
      leaveType: 'Vacation',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '20 Aug, 2024',
      endDate: '27 Aug, 2024',
      totalDays: '7',
      reason: 'Travel',
      approvedBy: '',
      dateRequested: '15 Aug, 2024',
      dateApproved: '18 Aug, 2024',
      status: 'Pending',
      staffleaveId: 'SL-2024004',
    },
    {
      leaveType: 'Maternity',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '5 Sep, 2024',
      endDate: '5 Sep, 2024',
      totalDays: '7',
      reason: 'Mom Birthday',
      approvedBy: 'HR',
      dateRequested: '1 Sep, 2024',
      dateApproved: '3 Sep, 2024',
      status: 'Approved',
      staffleaveId: 'SL-2024005',
    },
    {
      leaveType: 'Sick',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '12 Sep, 2024',
      endDate: '16 Sep, 2024',
      totalDays: '7',
      reason: 'Surgery recovery',
      approvedBy: '',
      dateRequested: '10 Sep, 2024',
      dateApproved: '11 Sep, 2024',
      status: 'Pending',
      staffleaveId: 'SL-2024006',
    },
    {
      leaveType: 'Vacation',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '1 Oct, 2024',
      endDate: '10 Oct, 2024',
      totalDays: '7',
      reason: 'Honeymoon',
      approvedBy: 'Admin',
      dateRequested: '25 Sep, 2024',
      dateApproved: '28 Sep, 2024',
      status: 'Approved',
      staffleaveId: 'SL-2024007',
    },
    {
      leaveType: 'Personal',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '20 Oct, 2024',
      endDate: '22 Oct, 2024',
      totalDays: '7',
      reason: 'Personal reasons',
      approvedBy: 'Manager',
      dateRequested: '18 Oct, 2024',
      dateApproved: '19 Oct, 2024',
      status: 'Rejected',
      staffleaveId: 'SL-2024008',
    },
    {
      leaveType: 'Sick',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '5 Nov, 2024',
      endDate: '7 Nov, 2024',
      totalDays: '7',
      reason: 'Flu',
      approvedBy: 'HR',
      dateRequested: '3 Nov, 2024',
      dateApproved: '4 Nov, 2024',
      status: 'Approved',
      staffleaveId: 'SL-2024009',
    },
    {
      leaveType: 'Vacation',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '15 Nov, 2024',
      endDate: '22 Nov, 2024',
      totalDays: '7',
      reason: 'Holiday',
      approvedBy: '',
      dateRequested: '10 Nov, 2024',
      dateApproved: '12 Nov, 2024',
      status: 'Pending',
      staffleaveId: 'SL-20240010',
    },
    {
      leaveType: 'Maternity',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '1 Dec, 2024',
      endDate: '1 Dec, 2024',
      totalDays: '7',
      reason: 'Childbirth',
      approvedBy: 'HR',
      dateRequested: '28 Nov, 2024',
      dateApproved: '30 Nov, 2024',
      status: 'Approved',
      staffleaveId: 'SL-20240011',
    },
    {
      leaveType: 'Personal',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '10 Dec, 2024',
      endDate: '12 Dec, 2024',
      totalDays: '7',
      reason: 'Family event',
      approvedBy: '',
      dateRequested: '7 Dec, 2024',
      dateApproved: '9 Dec, 2024',
      status: 'Pending',
      staffleaveId: 'SL-20240012',
    },
    {
      leaveType: 'Sick',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '20 Dec, 2024',
      endDate: '22 Dec, 2024',
      totalDays: '7',
      reason: 'Medical',
      approvedBy: 'HR',
      dateRequested: '18 Dec, 2024',
      dateApproved: '19 Dec, 2024',
      status: 'Approved',
      staffleaveId: 'SL-20240013',
    },
    {
      leaveType: 'Vacation',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '1 Jan, 2025',
      endDate: '7 Jan, 2025',
      totalDays: '7',
      reason: 'New Year holiday',
      approvedBy: '',
      dateRequested: '27 Dec, 2024',
      dateApproved: '30 Dec, 2024',
      status: 'Pending',
      staffleaveId: 'SL-20240014',
    },
    {
      leaveType: 'Personal',
      contactNumber: '123-456-7890',
      emergencyNumber: '987-654-3210',
      startDate: '15 Jan, 2025',
      endDate: '17 Jan, 2025',
      totalDays: '7',
      reason: 'Personal reasons',
      approvedBy: '',
      dateRequested: '12 Jan, 2025',
      dateApproved: '14 Jan, 2025',
      status: 'Pending',
      staffleaveId: 'SL-20240015',
    },
  ];
  constructor() {}

  getStaffleave(): Observable<LeaveRequest[]> {
    return of(this.staffLeave);
  }

  addStaffleave(Staffleave: LeaveRequest): Observable<LeaveRequest> {
    if (Array.isArray(this.staffLeave)) {
      this.staffLeave = [Staffleave, ...this.staffLeave];
    }
    return of(Staffleave);
  }

  updateStaffleave(updatedStaffleave: LeaveRequest): Observable<LeaveRequest> {
    const updatedStaffleaves = this.staffLeave.map((Staffleave) =>
      Staffleave.staffleaveId === updatedStaffleave.staffleaveId
        ? updatedStaffleave
        : Staffleave
    );

    this.staffLeave = [...updatedStaffleaves];

    return of(updatedStaffleave);
  }

  deleteStaffleave(id: string): Observable<void> {
    this.staffLeave = this.staffLeave.filter((s) => s.staffleaveId !== id);
    return of(void 0);
  }
}
