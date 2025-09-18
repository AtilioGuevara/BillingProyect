import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-emp-sal-edit',
    imports: [ReactiveFormsModule, LucideAngularModule, CommonModule],
    templateUrl: './emp-sal-edit.component.html',
    styleUrl: './emp-sal-edit.component.scss'
})
export class EmpSalEditComponent {


  @Input() config: any

  formGroup!: FormGroup;

  constructor(public fb: FormBuilder, public modalService: ModalService) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      employeeName: new FormControl(this.config.employeeName, [Validators.required]),
      email: new FormControl(this.config.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.config.phoneNumber, [Validators.required, Validators.pattern('^\\+?[0-9\\-\\s]*$')]),
      department: new FormControl(this.config.department, [Validators.required]),
      monthlySalary: new FormControl(this.config.monthlySalary, [Validators.required, Validators.pattern('^\\$?([0-9]{1,3}(,[0-9]{3})*|[0-9]+)(\\.[0-9]{2})?$')]),
      status: new FormControl(this.config.status, [Validators.required])
    })
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return
    }

    this.modalService.close(this.formGroup.value)
  }

  close() {
    this.modalService.close()
  }

}
