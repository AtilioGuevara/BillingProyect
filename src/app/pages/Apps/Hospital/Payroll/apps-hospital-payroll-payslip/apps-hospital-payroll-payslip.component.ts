import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-apps-hospital-payroll-payslip',
    imports: [PageTitleComponent, CommonModule, FormsModule],
    templateUrl: './apps-hospital-payroll-payslip.component.html',
    styleUrl: './apps-hospital-payroll-payslip.component.scss'
})
export class AppsHospitalPayrollPayslipComponent {
  printPage(): void {
    window.print();
  }

}
