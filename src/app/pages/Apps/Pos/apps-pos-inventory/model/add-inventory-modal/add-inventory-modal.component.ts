import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-inventory-modal',
  imports: [LucideAngularModule, CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './add-inventory-modal.component.html',
  styleUrl: './add-inventory-modal.component.scss'
})
export class AddInventoryModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };

  constructor(
    private modalService: ModalService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.fromGroup = this.fb.group({
      name: ['', Validators.required],
      sku: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      categoryname: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      ministock: new FormControl('', [Validators.required]),
      maxstock: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  typeOptions = [
    { label: 'All Departments', value: 'All Departments' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Management', value: 'Management' },
    { label: 'IT', value: 'IT' },
    { label: 'Human Resources', value: 'Human Resources' },
  ];


  close() {
    this.modalService.close();
  }

  closeEventModal() {
    if (!this.fromGroup.valid) {
      return;
    }

    const formData = {
      ...this.fromGroup.value,
    };

    const data = {
      isAddOrEdit: !!this.config, // true if editing, false if adding
      formData,
    };

    this.modalService.close(data);
  }
}
