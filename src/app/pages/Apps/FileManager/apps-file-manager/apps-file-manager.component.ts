import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';

import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { DomixEchartComponent } from '../../../../componate/domix-echart/domix-echart.component';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { CreateFolderModalComponent } from '../model/create-folder-modal/create-folder-modal.component';
import { RenameFileModalComponent } from '../model/rename-file-modal/rename-file-modal.component';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';

interface FileData {
  image: string; // URL to the file icon
  type: string; // File type (e.g., txt, pdf, ppt, PNG, MP3, CSV, Docs)
  documentName: string; // Name of the document
  size: string; // Size of the document
  lastEdit: string; // Date of last edit
}

interface Folder {
  name: string; // Folder name
  description: string; // Description of the folder's contents
}

interface AllFileData {
  Folder: Folder[]; // Folder name
  File: File[]; // Description of the folder's contents
}

@Component({
    selector: 'app-apps-file-manager',
    imports: [
        PageTitleComponent,
        DomixEchartComponent,
        DomixDropdownModule,
        LucideAngularModule,
        CommonModule,
        FormsModule,
        DomixPaginationComponent,
    ],
    templateUrl: './apps-file-manager.component.html',
    styleUrl: './apps-file-manager.component.scss'
})
export class AppsFileManagerComponent extends DomixGridTestComponent {
  allFoldersData: any;
  folderData: any;
  fileData: FileData[] = [];
  hasHeaderCheckbox = false;

  gaugeChart = {
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        grid: {
          top: '0%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true,
        },
        axisTick: {
          distance: -20,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4,
          },
        },
        axisLabel: {
          color: 'inherit',
          distance: 25,
          fontSize: 12,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} GB',
          fontSize: 16,
          color: 'inherit',
        },
        data: [
          {
            value: 80,
          },
        ],
      },
    ],
  };

  constructor(
    public restApiService: RestApiService,
    private modalService: ModalService,
    private test: DomixTableService
  ) {
    super(test);
  }

  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getFileMangerData().subscribe((data: any) => {
      this.allFoldersData = data;
      this.fileData = this.allFoldersData['files'];
      this.folderData = this.allFoldersData['folders'];

      this.gridData = this.fileData;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  openRenameModal(projectData: any | null, index: number | null) {
    const data = projectData ? projectData : null;
    this.modalService.open(RenameFileModalComponent, data, (result) => {
      if (result && index !== null && index > -1) {
        this.fileData[index] = {
          ...this.fileData[index],
          ...result,
        };

        this.gridData = this.fileData;
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }

  openDeleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.displayedData.splice(index, 1);
        // this.gridData = this.fileData;
        // this.displayedData = [...this.gridData];
        // this.updateDisplayedData();
      }
    });
  }

  openCreateFolderModal() {
    this.modalService.open(CreateFolderModalComponent, {}, (result) => {
      if (result) {
        this.folderData.push(result);
      }
    });
  }
  deleteFolderModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.folderData.splice(index, 1);
      }
    });
  }

  columnDefs: ColDefs[] = [
    {
      field: 'image',
      headerName: 'Type',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'documentName',
      headerName: '	Document Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'size',
      headerName: 'Size',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'lastEdit',
      headerName: 'Last Edit',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ];
}
