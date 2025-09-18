import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-rename-file-modal',
    imports: [LucideAngularModule, ReactiveFormsModule, CommonModule],
    templateUrl: './rename-file-modal.component.html',
    styleUrl: './rename-file-modal.component.scss'
})
export class RenameFileModalComponent {
  @Input() config: any;
  fromGroup!: FormGroup;

  constructor(private modalService: ModalService, public fb: FormBuilder) {}

  ngOnInit() {
    this.fromGroup = this.fb.group({
      documentName: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  closeFileModal(onlyClose = true) {
    if (this.fromGroup.valid) {
      this.modalService.close(!onlyClose ? this.fromGroup.value : null);
    } 
  }
}
