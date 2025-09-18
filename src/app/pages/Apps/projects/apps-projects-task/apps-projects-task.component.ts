import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';

import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { ShareProjectModalComponent } from '../share-project-modal/share-project-modal.component';
import { RouterLink } from '@angular/router';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { project } from '../../../../Data/employee-data';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
import { DomixTooltipModule } from '../../../../module/domix tooltip/domix-tooltip.module';
interface Task {
  text: string;
  completed: boolean;
  editing: boolean;
}

@Component({
    selector: 'app-apps-projects-task',
    imports: [
        PageTitleComponent,
        DomixDropdownModule,
        DomixTooltipModule,
        CommonModule,
        LucideAngularModule,
        FormsModule,
        RouterLink,
        DomixPaginationComponent,
    ],
    templateUrl: './apps-projects-task.component.html',
    styleUrl: './apps-projects-task.component.scss'
})
export class AppsProjectsTaskComponent extends DomixGridTestComponent {
  entriesOptions = [5, 10, 15, 20];
  employees = project;
  searchText1: string = '';
  p1: number = 1;

  ngOnInit(): void {
    this.gridData = this.employees;
    // this.categories = Array.from(new Set(this.gridData.map((p) => p.category)));
    this.displayedData = [...this.gridData];
    this.updateDisplayedData();
  }

  onSearch(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    this.onSearchChange(searchText);
  }

  columnDefs: ColDefs[] = [
    {
      field: 'taskName',
      headerName: 'Task Name',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'createDate',
      headerName: '	Create Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'assignees',
      headerName: 'Assigned To',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'status',
      headerName: '	Status',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'priority',
      headerName: 'Priority',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ];

  todayTasks: Task[] = [];
  yesterdayTasks: Task[] = [];
  newTask: string = '';
  currentUser = {
    name: 'Ina Payne',
    image: 'assets/images/avatar/user-5.png',
    role: 'Project Manager',
  };

  users = [
    {
      name: 'Ina Payne',
      image: 'assets/images/avatar/user-5.png',
      role: 'Project Manager',
    },
    {
      name: 'Robert Freeman',
      image: 'assets/images/avatar/user-11.png',
      role: 'Project Manager',
    },
    {
      name: 'Michelle Weigle',
      image: 'assets/images/avatar/user-13.png',
      role: 'Project Manager',
    },
    {
      name: 'William Keen',
      image: 'assets/images/avatar/user-14.png',
      role: 'Project Manager',
    },
  ];

  activeUser: { name: string; image: string; role: string } | null = null;

  constructor(
    private modalService: ModalService,
    private test: DomixTableService
  ) {
    super(test);
    this.todayTasks = [
      { text: 'Define Data Requirements', completed: true, editing: false },
      { text: 'Identify Data Sources', completed: false, editing: false },
      {
        text: 'Setup Initial Infrastructure',
        completed: false,
        editing: false,
      },
    ];

    this.yesterdayTasks = [
      { text: 'Initial Data Cleaning', completed: false, editing: false },
      { text: 'Data Profiling', completed: false, editing: false },
      { text: 'Data Transformation', completed: false, editing: false },
    ];
  }

  isActive(user: any): boolean {
    return this.activeUser === user;
  }

  selectUser(user: any): void {
    this.activeUser = user;
  }

  openModal() {
    this.modalService.open(ShareProjectModalComponent);
  }

  get todayTasksCount(): number {
    return this.todayTasks.length;
  }

  get yesterdayTasksCount(): number {
    return this.yesterdayTasks.length;
  }

  enableEditing(task: Task) {
    task.editing = true;
  }

  disableEditing(task: Task) {
    task.editing = false;
  }

  deleteTask(task: Task) {
    this.todayTasks = this.todayTasks.filter((t) => t !== task);
    this.yesterdayTasks = this.yesterdayTasks.filter((t) => t !== task);
  }

  addTask() {
    if (this.newTask.trim()) {
      this.todayTasks.push({
        text: this.newTask.trim(),
        completed: false,
        editing: false,
      });
      this.newTask = '';
    }
  }
}
