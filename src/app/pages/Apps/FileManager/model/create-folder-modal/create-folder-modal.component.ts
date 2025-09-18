import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-create-folder-modal',
    imports: [LucideAngularModule, ReactiveFormsModule, CommonModule],
    templateUrl: './create-folder-modal.component.html',
    styleUrl: './create-folder-modal.component.scss'
})
export class CreateFolderModalComponent  {
  @Input() config: any;
  fromGroup!: FormGroup;

  constructor(private modalService: ModalService, public fb: FormBuilder) {
 }

  ngOnInit() {
    this.fromGroup = this.fb.group({
      name: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }
  closeFileModal() {
    if (this.fromGroup.valid) {
      this.modalService.close(this.fromGroup.value);
    } 
  }

}
