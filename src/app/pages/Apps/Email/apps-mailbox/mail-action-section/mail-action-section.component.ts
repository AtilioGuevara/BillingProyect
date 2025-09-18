import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AllEmail } from '../apps-mailbox.component';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { emailPattern } from '../../../../../Core/shared functions/shared-functions-varibles';

@Component({
    selector: 'app-mail-action-section',
    imports: [LucideAngularModule, CommonModule, SimplebarAngularModule, ReactiveFormsModule],
    templateUrl: './mail-action-section.component.html',
    styleUrl: './mail-action-section.component.scss'
})
export class MailActionSectionComponent {

  constructor(private modalService: ModalService) { }

  @Input() filterdData: AllEmail[] = [];
  @Input() selectedEmail!: AllEmail;
  @Output() delectedMailIndex = new EventEmitter<number | null >();
  @Output() closeSidePannal = new EventEmitter<boolean>();
  selectedEmailPostion!: number | null;
  openMails!: AllEmail;
  options = { autoHide: true }
  email = new FormControl('', [Validators.required, Validators.pattern(emailPattern)]);
  message = new FormControl('', Validators.required);

  ngOnInit() {}

  ngOnChanges(chanegs: SimpleChanges) {
    if (chanegs['selectedEmail']) {
      const totalResultsChange = chanegs['selectedEmail'];
      if (totalResultsChange.currentValue !== totalResultsChange.previousValue) {
        this.prepareOpenMail(totalResultsChange.currentValue)
      }
    }
  }

  deleteMail(id:number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.delectedMailIndex.emit(id);
      }
    })
  }

  close() {
    this.closeSidePannal.emit(true);
  }

  next(i: number | null) {
    if (i !== null) {
      i++;
      this.prepareOpenMail(this.filterdData[i]);
    }
  }

  pre(i: number | null) {
    if (i !== null) {
      i--;
      this.prepareOpenMail(this.filterdData[i]);
    }
  }

  prepareOpenMail(setSelectedEmail: AllEmail) {
    this.openMails = setSelectedEmail;

    this.selectedEmailPostion = this.filterdData.findIndex(x => x.id == this.openMails.id);

    this.email.setValue(this.openMails.email);
    this.email.disable();
  }

  save() {
    if (!this.message.valid) {
      this.email.markAsTouched();
      this.message.markAsTouched();
      return
    }

    const newSenderMessage: any = {
      id: this.openMails.id,  // Simulating unique id
      sender: this.openMails.sender,
      email: this.openMails.email,
      avatarImage: this.openMails.avatarImage,  // Sender's avatar
      avatarText: this.openMails.avatarText,
      date: this.openMails.date,  // Current date/time
      subject: this.message.value || '',  // Same subject or a new one if needed
    };


    this.openMails.replies.push(newSenderMessage)

    this.message.setValue('');
  }
}
