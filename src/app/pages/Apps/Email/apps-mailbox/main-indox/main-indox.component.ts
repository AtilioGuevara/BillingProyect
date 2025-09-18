import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { SimplebarAngularModule } from 'simplebar-angular';
import { AllEmail } from '../apps-mailbox.component';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../../module/domix dropdown/domix-dropdown.module';
import { SearchMailComponent } from '../search-mail/search-mail.component';

@Component({
    selector: 'app-main-indox',
    imports: [CommonModule, SimplebarAngularModule, FormsModule, LucideAngularModule, DomixDropdownModule],
    templateUrl: './main-indox.component.html',
    styleUrl: './main-indox.component.scss'
})
export class MainIndoxComponent {

  constructor(private modalService: ModalService) { }

  @Input() data: AllEmail[] = [];
  @Output() setSelectedItemIndex = new EventEmitter<number>();
  @Output() deleteMailIds = new EventEmitter<number[]>();
  options = { autoHide: true }
  showMessage: AllEmail[] = [];
  allDeletedArr: number[] = [];
  headerCheckBox!: boolean

  ngOnInit() { }


  onMsgSelect(index: number) {
    this.setSelectedItemIndex.emit(index);
  }

  deleteMail() {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.deleteMailIds.emit(this.allDeletedArr);

        this.allDeletedArr = [];
        this.headerCheckBox = false;
      }
    })
  }

  allCheckChange() {
    this.allDeletedArr = [];

    if (this.headerCheckBox) {
      const allEmailIds = this.data.map(x => x.id);
      this.allDeletedArr = allEmailIds;
    } else {
      this.allDeletedArr = [];
    }
  }

  proccedDelMail(id: number) {
    if (!this.allDeletedArr.includes(id)) {
      this.allDeletedArr.push(id)
    } else {
      const idIndex = this.allDeletedArr.findIndex(existingId => existingId === id);
      this.allDeletedArr.splice(idIndex, 1)
    }

    this.headerCheckBox = this.allDeletedArr.length === this.data.length;
  }

  searchModal() {
    this.modalService.open(SearchMailComponent, {}, () => {

    });
  }
}
