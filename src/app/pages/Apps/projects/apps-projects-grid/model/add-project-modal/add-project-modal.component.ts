import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { LucideAngularModule } from 'lucide-angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loginUserImage } from '../../../../../../Core/shared functions/shared-functions-varibles';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Assignee } from '../../../apps-projects-list/apps-projects-list.component';

@Component({
    selector: 'app-add-project-modal',
    imports: [LucideAngularModule, ReactiveFormsModule, CommonModule, FlatpickrModule, NgSelectModule],
    templateUrl: './add-project-modal.component.html',
    styleUrl: './add-project-modal.component.scss'
})
export class AddProjectModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;

  constructor(private modalService: ModalService, public fb: FormBuilder) {
  }
  ngOnInit() {
    this.fromGroup = this.fb.group({
      projectImage: new FormControl(loginUserImage),
      projectName: new FormControl('', [Validators.required]),
      clientName: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
      totalAmount: new FormControl('', [Validators.required]),
      assignees: new FormControl([], [Validators.required]),
      status: new FormControl('', [Validators.required]),
      progress: new FormControl('', [Validators.required, Validators.minLength(100)]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
      const assImg = this.config.assignees.map((assignee: Assignee) => assignee.name);
      this.fromGroup.patchValue({
        assignees: assImg,
      });
    }
  }

  assigneeOptions = [
    { name: 'Max Boucaut', image: 'assets/images/avatar/user-14.png' },
    { name: 'Nastasha Tegg', image: 'assets/images/avatar/user-15.png' },
    { name: 'Ethan Zahel', image: 'assets/images/avatar/user-16.png' },
    { name: 'Ryan Frazer', image: 'assets/images/avatar/user-18.png' },
    { name: 'Julian Marconi', image: 'assets/images/avatar/user-12.png' },
    { name: 'Poppy Dalley', image: 'assets/images/avatar/user-17.png' },
    { name: 'Sam Taylor', image: 'assets/images/avatar/user-19.png' },
  ];

  statusOptions = [
    { label: "Active", value: "Active" },
    { label: "On Hold", value: "On Hold" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" }
  ];

  closeaddProjectModal() {
    const selectedAssignees = this.fromGroup.get('assignees')?.value;
    const assigneesData = this.assigneeOptions.filter(option => selectedAssignees.includes(option.name));

    const formData = {
      ...this.fromGroup.value,
      assignees: assigneesData,
    };

    const data = {
      isAddOrEdit: this.config ? true : false,
      formData,
    };
    
    this.modalService.close(data);
  }

}
