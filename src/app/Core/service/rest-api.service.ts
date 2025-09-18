import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AllScheduleDate } from '../../pages/Apps/Hospital/apps-hospital-doctor-schedule/apps-hospital-doctor-schedule.component';
import { Products } from '../../pages/Apps/Ecommerce/Products/interfaces/product.model';
import { CategoryList } from '../../pages/Apps/Ecommerce/Products/components/apps-ecommerce-category/apps-ecommerce-category.component';
import { OrderList } from '../../pages/Apps/Ecommerce/Orders/apps-ecommerce-orders-list/apps-ecommerce-orders-list.component';
import { PatientList } from '../../pages/Apps/Hospital/Patients/components/apps-hospital-patients-lists/apps-hospital-patients-lists.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) { }

  //dashboard-email
  getDashboardEmailData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/dashboard-email.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //dashboard-email
  getDashboardHospitalData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/dashboard-hospital.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  // Email Api
  getEmailData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/email.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  // Patient Api
  getPatientList() {
    return this.http
      .get<PatientList[]>(this.addDynamicURL('assets/api/patients.json'))
      .pipe(
        map((patients: PatientList[]) => {
          return patients.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
          });
        })
      );
  }

  getOrderList() {
    let startID = 19127;
    return this.http
      .get<OrderList[]>(this.addDynamicURL('assets/api/orders-list.json'))
      .pipe(
        map((pData: OrderList[]) => {
          return pData.map((product, index) => {
            product.orderID = 'PEO-' + (startID + index).toString();
            return product;
          });
        })
      );
  }

  // Get doctor schedule data
  getScheduleList() {
    return this.http
      .get<AllScheduleDate[]>(this.addDynamicURL('assets/api/schedule.json'))
      .pipe(
        map((sData: AllScheduleDate[]) => {
          return sData.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
          });
        })
      );
  }

  getCatList() {
    let startID = 19127;
    return this.http
      .get<CategoryList[]>(this.addDynamicURL('assets/api/category-list.json'))
      .pipe(
        map((pData: CategoryList[]) => {
          return pData.map((product, index) => {
            product.productID = 'PEC-' + (startID + index).toString();
            return product;
          });
        })
      );
  }

  //Project-user
  getProjectData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/project-user.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //Project-grid
  getProjectGridData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/projects-grid.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //Project-List
  getProjectListData(queryParams?: any) {
    let startID = 22706;
    return this.http
      .get<any>(this.addDynamicURL('assets/api/projects-list.json'))
      .pipe(
        map((peojectData: any) => {
          return peojectData.map((contact: any, index: number) => {
            contact.projectID = 'PEP-' + (startID + index).toString();
            return contact;
          });
        })
      );
  }

  //crm-lead
  getCrmLeadData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/crm-lead-list.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }
  //crm-deal
  getCrmDealData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/crm-deals-list.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //invoice-overview1 /overview2
  getInvoiceData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/invoice.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //invoice-List/Grid
  getInvoiceListData(queryParams?: any) {
    let startID = 15475;
    return this.http
      .get<any>(this.addDynamicURL('assets/api/invoices-list.json'))
      .pipe(
        map((invoiceData: any) => {
          return invoiceData.map((contact: any, index: number) => {
            contact.invoicesID = 'PEI-' + (startID + index).toString(); // Add a unique contact ID
            return contact;
          });
        })
      );
  }

  //envents-Grid
  getEventData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/events-grid.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //envents-Grid
  getEventListData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/events-list.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //Pos-Customer
  getPosCostomerData(queryParams?: any) {
    let startID = 15475;
    return this.http
      .get<any>(this.addDynamicURL('assets/api/pos-customer.json'))
      .pipe(
        map((CusData: any) => {
          return CusData.map((contact: any, index: number) => {
            contact.CusData = 'PEI-' + (startID + index).toString(); // Add a unique contact ID
            return contact;
          });
        })
      );
  }

  //Pos-Employee
  getPosEmployeeData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/pos-employee.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //pos-promotions-marketing
  getPosPromotionsMarketingData(queryParams?: any) {
    let startID = 17475;
    return this.http
      .get<any>(this.addDynamicURL('assets/api/pos-promotions-marketing.json'))
      .pipe(
        map((PromData: any) => {
          return PromData.map((marketing: any, index: number) => {
            marketing.promoCode = 'PEI-' + (startID + index).toString();
            return marketing;
          });
        })
      );
  }

  //Pos-Employee
  getPosInventoryData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/pos-inventory.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //file-manger
  getFileMangerData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/file-list.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //chat-group-vidoe
  getUserData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/video.group.chat.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //Chat-group
  getGroupData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/chat-group.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //chat-default
  getChatDefaultData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/chat-contact.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //school-library
  getBookData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/books-list.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //school-exam-questions
  getQuestionsData(queryParams?: any) {
    let questionID = 19115;
    return this.http
      .get<any>(this.addDynamicURL('assets/api/questions-data.json'))
      .pipe(
        map((questionData: any) => {
          return questionData.map((question: any, index: number) => {
            question.questionID = 'QNT-' + (questionID + index).toString(); // Add a unique contact ID
            return question;
          });
        })
      );
  }

  //crm-contact
  getContactData(queryParams?: any) {
    let startID = 19115;
    return this.http
      .get<any>(this.addDynamicURL('assets/api/crm-contact-list.json'))
      .pipe(
        map((contactData: any) => {
          return contactData.map((contact: any, index: number) => {
            contact.contactID = 'CNT-' + (startID + index).toString(); // Add a unique contact ID
            return contact;
          });
        })
      );
  }

  // Product list
  getProductList() {
    let startID = 19115;
    return this.http
      .get<Products[]>(this.addDynamicURL('assets/api/product.json'))
      .pipe(
        map((pData: Products[]) => {
          return pData.map((product, index) => {
            product.productID = 'PEP-' + (startID + index).toString();
            return product;
          });
        })
      );
  }

  //school-List
  getSchoolListData(queryParams?: any) {
    let startID = 1595;
    return this.http
      .get<any>(this.addDynamicURL('assets/api/students-list.json'))
      .pipe(
        map((schoolData: any) => {
          return schoolData.map((contact: any, index: number) => {
            contact.studentID = 'PES-' + (startID + index).toString();
            return contact;
          });
        })
      );
  }

  //teacher-List
  getTeacherListData(queryParams?: any) {
    let startID = 2551;
    return this.http
      .get<any>(this.addDynamicURL('assets/api/teachers-list.json'))
      .pipe(
        map((teacherData: any) => {
          return teacherData.map((contact: any, index: number) => {
            contact.teacherID = 'PET-' + (startID + index).toString();
            return contact;
          });
        })
      );
  }

  //teacher-payroll
  getTeacherpayrollData(queryParams?: any) {
    return this.http.get<any>(
      this.addDynamicURL('assets/api/teachers-payroll.json')
    );
  }

  //teacher-payroll
  getSchoolParentsListData(queryParams?: any) {
    return this.http.get<any>(
      this.addDynamicURL('assets/api/school-parents-list.json')
    );
  }

  //exam-schedule
  getTestDetails(queryParams?: any) {
    let startID = 511;
    return this.http
      .get<any>(this.addDynamicURL('assets/api/exam-list.json'))
      .pipe(
        map((examData: any) => {
          return examData.map((contact: any, index: number) => {
            contact.scheduleID = 'PEE-' + (startID + index).toString();
            return contact;
          });
        })
      );
  }

  //Order Track
  getOrderData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/orders-recent.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //ecommerce-customer-list
  getCustomerlistData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/customers-list.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //ecommerce-shop-cart
  getShopCartData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/shop-cart.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //ecommerce-manage-reviews
  getUserReview(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/manage-reviews.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //Hospital-Reports
  getReportsTable(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/report.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //Hospital-Medicine
  getMedicineData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/medicine.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }
  //Hospital-patients
  getAppointmentsData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/appointments.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //Hospital-Medicine
  getEmpSalData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/employee-salary.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //Hospital-holiday
  getMedicineholidayData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/holiday.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //Hospital-Staff
  getallStaff(queryParams?: any) {
    let startID = 1595;
    return this.http.get<any>(this.addDynamicURL('assets/api/staff.json')).pipe(
      map((staffData: any) => {
        return staffData.map((contact: any, index: number) => {
          contact.staffID = 'PES-' + (startID + index).toString();
          return contact;
        });
      })
    );
  }

  //Hospital-Attendance
  getallAttendance(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/attendance.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  //Hospital-staff-department
  getStaffDepartment(queryParams?: any) {
    let startID = 1;
    return this.http
      .get<any>(this.addDynamicURL('assets/api/staff-department.json'))
      .pipe(
        map((departmentData: any) => {
          return departmentData.map((contact: any, index: number) => {
            contact.departmentID = 'PED-' + (startID + index).toString();
            return contact;
          });
        })
      );
  }

  //hospital-doctor-schedule
  getAppointmentData(queryParams?: any) {
    return this.http.get(
      this.addDynamicURL('assets/api/doctor-schedule.json', {}),
      queryParams ? this.addQueryParams(queryParams) : {}
    );
  }

  addDynamicURL(url: string, stringParams?: any) {
    if (stringParams) {
      Object.keys(stringParams).forEach((key) => {
        url = url.replace('{' + key + '}', stringParams[key]);
      });
    }
    return url;
  }

  addQueryParams(params?: any) {
    let searchParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      searchParams = searchParams.append(key, params[key]);
    });
    return { params: searchParams };
  }
}
