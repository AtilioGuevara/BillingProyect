import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { MainFormComponent } from './main-form/main-form.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { GuardianDetailsComponent } from './guardian-details/guardian-details.component';
import { EducationalBackgroundComponent } from './educational-background/educational-background.component';
import { DocumentsComponent } from './documents/documents.component';
import { ApplicationOverviewComponent } from './application-overview/application-overview.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    selector: 'app-apps-school-students-admission',
    imports: [
        PageTitleComponent,
        PersonalDetailsComponent,
        GuardianDetailsComponent,
        EducationalBackgroundComponent,
        DocumentsComponent,
        ApplicationOverviewComponent,
        CommonModule,
        NgSelectModule,
    ],
    templateUrl: './apps-school-students-admission.component.html',
    styleUrl: './apps-school-students-admission.component.scss'
})
export class AppsSchoolStudentsAdmissionComponent {
  openTab = 1;
  activeClasses = 'bg-primary-500 text-primary-50';
  inactiveClasses = 'text-gray-600';
  typeOptions = [
    { label: 'Paid', value: 'Paid' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Unpaid', value: 'Unpaid' },
  ];

  studData = [
    {
      studId: '1',
      personalDetail: {
        firstName: 'test',
        middleName: 'test',
        lastName: 'test',
        gender: 'male',
        age: '25',
        dob: '23/03/99',
        mNumber: '789456123',
        alNumber: '123456888',
        email: 'test@gmail.com',
        nationality: 'indian',
        perAddress: 'test surat road',
        city: 'surat',
        country: 'india',
        pinCode: '395440',
      },
      gradianDetail: {
        fatherName: 'test father',
        motherName: 'test mother',
        otherRelative: 'test reletive',
        phNomber: '78946513',
        alMoblieNu: '7531598',
      },
      eduBackground: {
        name: 'test edu',
        graduationYear: '2000',
        gpa: '8 lpa',
        major: 'mjor test',
        instituteName: 'instituteName',
        graduationYearUnder: '2001',
        gpaUnder: '8 Lpa',
        majorUnder: 'mjor test under',
        honors: 'test honors',
        extracurricular: 'test Extracurricular',
        leadership: 'test leadership',
        publications: 'test Publications',
      },
      application: {
        appId: '#PEA-1478A5487956236',
        reffNu: 'Reference Number',
        dateOfApp: 'test app',
      },
    },
  ];
}
