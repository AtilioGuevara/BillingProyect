import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { DomixDropdownModule } from '../../../../../module/domix dropdown/domix-dropdown.module';
import { RestApiService } from '../../../../../Core/service/rest-api.service';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { OverviewQuestionModalComponent } from './model/overview-question-modal/overview-question-modal.component';
import { AddQuestionModalComponent } from './model/add-question-modal/add-question-modal.component';
import { FormsModule } from '@angular/forms';
import { DeleteModalComponent } from '../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { DomixTableService } from '../../../../../componate/domix-grid-test/service/domix-table.service';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../componate/domix-grid-test/domix-grid-test.component';
import { NgSelectModule } from '@ng-select/ng-select';
export interface Question {
  id: number;
  question: string;
  options: string[];
  type: string;
  difficulty: string;
  status: string;
}

@Component({
    selector: 'app-apps-school-exam-question',
    imports: [
        PageTitleComponent,
        LucideAngularModule,
        CommonModule,
        DomixDropdownModule,
        FormsModule,
        NgSelectModule,
    ],
    templateUrl: './apps-school-exam-question.component.html',
    styleUrl: './apps-school-exam-question.component.scss'
})
export class AppsSchoolExamQuestionComponent extends DomixGridTestComponent {
  allQuestion: Question[] = [];
  hasHeaderCheckbox = false;

  constructor(
    public restApiService: RestApiService,
    private modalService: ModalService,
    private test: DomixTableService
  ) {
    super(test);
    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);
  }

  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getQuestionsData().subscribe((data: any) => {
      this.allQuestion = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  columnDefs: ColDefs[] = [
    {
      field: 'question',
      headerName: 'Questions',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      headerName: 'Option',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'type',
      headerName: 'Item Type',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'difficulty',
      headerName: 'Difficult',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ];

  catgoryChange() {
    if (this.selectedCategory) {
      const filterModel: any = {};
      filterModel.type = {
        type: 'equals',
        filterType: 'text',
        filter: this.selectedCategory,
      };

      this.appliedFilters = filterModel;
      this.updateDisplayedData();
    }
  }

  categories = [
    { label: 'All', value: 'All' },
    { label: 'MCQ', value: 'MCQ' },
    { label: 'Q & A', value: 'Q & A' },
    { label: 'Hard', value: 'Hard' },
    { label: 'No', value: 'No' },
  ];

  selectedCategory!: string;

  getCharFromIndex(index: number): string {
    return String.fromCharCode(65 + index); // 'A' is 65 in ASCII
  }

  openCreateModal(projectData: any | null, index: number | null) {
    const data = projectData;

    this.modalService.open(AddQuestionModalComponent, data, (result) => {
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

  overviewQuestionModal(data: Question) {
    this.modalService.open(
      OverviewQuestionModalComponent,
      data,
      (result) => {}
    );
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
}
