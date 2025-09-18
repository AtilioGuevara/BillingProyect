import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { emailPattern } from '../../../../../Core/shared functions/shared-functions-varibles';
import { CommonModule } from '@angular/common';
import { EmailMenuType } from '../apps-mailbox.component';
import { ModalService } from '../../../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-compoce-mail',
    imports: [LucideAngularModule, ReactiveFormsModule, CommonModule],
    templateUrl: './compoce-mail.component.html',
    styleUrl: './compoce-mail.component.scss'
})
export class CompoceMailComponent {

  @Input() config: any;
  formGroup!: FormGroup;
  emailMenu = EmailMenuType

  constructor(private fb: FormBuilder,private modalService:ModalService) {
    this.formGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
      subject: new FormControl('',Validators.required),
      message: new FormControl('', Validators.required),
      replies: new FormControl([]),
      badges: this.fb.array(['sent']), // Initialize with a default badge
      type: new FormControl(this.emailMenu.Sent), // Default type
    })
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  send() {
    if (!this.formGroup.valid) {
      return
    }

    const newEmail = {
      ...this.formGroup.value,
      date: this.formatDate(new Date()),
      sender: (this.formGroup.get('email')?.value).split("@")[0],
      avatarText: (this.formGroup.get('email')?.value).charAt(0),
      id: this.config.id,
    };

    this.modalService.close(newEmail);
  }
  
  close() {
    this.modalService.close();
  }

}
