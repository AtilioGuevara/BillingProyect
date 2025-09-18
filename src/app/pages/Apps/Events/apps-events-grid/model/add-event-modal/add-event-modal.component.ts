import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  loginUserImage,
  loginUserName,
} from '../../../../../../Core/shared functions/shared-functions-varibles';
import { Contributor } from '../../apps-events-grid.component';

@Component({
    selector: 'app-add-event-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        FlatpickrModule,
        NgSelectModule,
    ],
    templateUrl: './add-event-modal.component.html',
    styleUrl: './add-event-modal.component.scss'
})
export class AddEventModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  mainImage: string | ArrayBuffer | null = null;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(private modalService: ModalService, public fb: FormBuilder) {}
  ngOnInit() {
    this.fromGroup = this.fb.group({
      mainImage: [],
      image: new FormControl(loginUserImage),
      username: new FormControl(loginUserName),
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      peopleSize: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      contributors: new FormControl([], [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);

      const cName = this.config.assignees.map((assignee: Contributor) => assignee.name);
      this.fromGroup.patchValue({
        contributors: cName,
      });
    }
  }

  typeOptions = [
    { label: 'Offline', value: 'Offline' },
    { label: 'Online', value: 'Online' },
  ];
  contributorOptions = [
    { name: 'Max Boucaut', image: 'assets/images/avatar/user-14.png' },
    { name: 'Nastasha Tegg', image: 'assets/images/avatar/user-15.png' },
    { name: 'Ethan Zahel', image: 'assets/images/avatar/user-16.png' },
    { name: 'Ryan Frazer', image: 'assets/images/avatar/user-18.png' },
    { name: 'Julian Marconi', image: 'assets/images/avatar/user-12.png' },
    { name: 'Poppy Dalley', image: 'assets/images/avatar/user-17.png' },
    { name: 'Sam Taylor', image: 'assets/images/avatar/user-19.png' },
  ];
  statusOptions = [
    { label: 'Published', value: 'Published' },
    { label: 'Coming Soon', value: 'Coming Soon' },
    { label: 'Expired', value: 'Expired' },
  ];

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fromGroup.get('mainImage')?.setValue(reader.result);
        // this.mainImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  close() {
    this.modalService.close();
  }

  closeEventModal() {
    if (!this.fromGroup.valid) {
      return;
    }

    const selectedAssignees = this.fromGroup.get('contributors')?.value;
    const assigneesData = this.contributorOptions.filter(option => selectedAssignees.includes(option.name));

    const data = {
      isAddOrEdit: this.config ? true : false, // Determine if it's an add or edit operation
      formData: {
        ...this.fromGroup.value, // Spread existing form data
        contributors: assigneesData,
      },
    };

    console.log(data);
    

    // Close the modal and pass the data
    this.modalService.close(data);
  }
}
