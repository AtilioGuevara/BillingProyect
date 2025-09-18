import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../../../../Core/service/modal/modal.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    selector: 'app-add-question-modal',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LucideAngularModule,
        NgSelectModule,
    ],
    templateUrl: './add-question-modal.component.html',
    styleUrl: './add-question-modal.component.scss'
})
export class AddQuestionModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(private modalService: ModalService, public fb: FormBuilder) {}
  ngOnInit() {
    this.fromGroup = this.fb.group({
      question: new FormControl('', [Validators.required]),
      op1: new FormControl('', [Validators.required]),
      op2: new FormControl('', [Validators.required]),
      op3: new FormControl('', [Validators.required]),
      op4: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      difficulty: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),

      options: new FormControl([]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  itemOptions = [
    { label: 'MCQ', value: 'MCQ' },
    { label: 'Q & A', value: 'Q & A' },
  ];
  difficultLevelOptions = [
    { label: 'Normal', value: 'Normal' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' },
  ];
  statusOptions = [
    { label: 'New', value: 'New' },
    { label: 'Old', value: 'Old' },
  ];

  close() {
    this.modalService.close();
  }

  closeModal() {
    if (!this.fromGroup.valid) {
      return;
    }
    let data = {};
    const optionData = [
      this.fromGroup.get('op1')?.value,
      this.fromGroup.get('op2')?.value,
      this.fromGroup.get('op3')?.value,
      this.fromGroup.get('op4')?.value,
    ];
    this.fromGroup.get('options')?.setValue(optionData);

    data = {
      isAddOrEdit: this.config ? true : false,
      formData: this.fromGroup.value,
    };

    this.modalService.close(data);
  }
}
