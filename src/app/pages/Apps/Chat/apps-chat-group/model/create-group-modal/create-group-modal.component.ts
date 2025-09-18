import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
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
    selector: 'app-create-group-modal',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        LucideAngularModule,
        NgSelectModule,
    ],
    templateUrl: './create-group-modal.component.html',
    styleUrls: ['./create-group-modal.component.scss']
})
export class CreateGroupModalComponent {
  @Input() config: any;
  @Output() groupCreated = new EventEmitter<any>(); // Emit the new group data
  fromGroup!: FormGroup;

  constructor(private modalService: ModalService, public fb: FormBuilder) { }

  ngOnInit() {
    this.fromGroup = this.fb.group({
      name: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  typeOptions = [
    { label: "Auli Ahokas", value: "Auli Ahokas" },
    { label: "Sirpa Kolkka", value: "Sirpa Kolkka" },
    { label: "Leena Laine", value: "Leena Laine" },
    { label: "Risto Saraste", value: "Risto Saraste" },
    { label: "Mikko Virtanen", value: "Mikko Virtanen" },
    { label: "Tuula Nieminen", value: "Tuula Nieminen" },
    { label: "Rosa Lynch", value: "Rosa Lynch" },
    { label: "Meagan Snow", value: "Meagan Snow" },
    { label: "Jessica Perry", value: "Jessica Perry" },
    { label: "Julie Lawson", value: "Julie Lawson" },
    { label: "Fiona Smith", value: "Fiona Smith" },
    { label: "Linda Stucky", value: "Linda Stucky" },
  ];

  closeFileModal() {
    if (this.fromGroup.valid) {
      const newGroup = {
        image: '/assets/images/brands/img-27.png', // Default image
        name: this.fromGroup.value.name, // Group name from form
        message: 'New create group', // Default message
        time: new Date().toLocaleTimeString(), // Current time
      };

      this.groupCreated.emit(newGroup); // Emit the new group data
      this.modalService.close(newGroup); // Optional: Close the modal if needed
    } else {
      this.modalService.close();
    }
  }
}
