import { Component } from '@angular/core';
import { AddReportsModalComponent } from '../../model/add-reports-modal/add-reports-modal.component';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomixPaginationComponent } from '../../../../../../../../componate/domix-pagination/domix-pagination.component';
import { PageTitleComponent } from '../../../../../../../../layouts/page-title/page-title.component';
import { DomixDropdownModule } from '../../../../../../../../module/domix dropdown/domix-dropdown.module';
import { DomixGridTestComponent } from '../../../../../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
export interface MedicalRecord {
  name: string;
  date: string;
  status: string;
  doctor: string;
}

@Component({
    selector: 'app-reports-table',
    imports: [
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
    ],
    templateUrl: './reports-table.component.html',
    styleUrl: './reports-table.component.scss'
})
export class ReportsTableComponent extends DomixGridTestComponent {
  allMedicalRecord: MedicalRecord[] = [];
  hasHeaderCheckbox = false;

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private modalService: ModalService
  ) {
    super(domiex);
  }

  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getReportsTable().subscribe((data: any) => {
      this.allMedicalRecord = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {

        this.gridData.splice(index, 1);
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }
  openCreateModal(projectdata: any | null, index: number | null) {
    const data = projectdata;

    this.modalService.open(AddReportsModalComponent, data, (result) => {
      if (result) {
        if (result.isAddOrEdit) {
          if (index !== null && index > -1) {
            this.gridData[index] = {
              ...this.gridData[index],
              ...result.formData,
            };
            this.displayedData = [...this.gridData];
            this.updateDisplayedData();
          }
        } else {
          this.gridData.unshift(result.formData);
          this.displayedData = [...this.gridData];
          this.updateDisplayedData();
        }
      }
    });
  }
}
