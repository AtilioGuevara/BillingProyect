import { Component, Input } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { LucideAngularModule } from 'lucide-angular';
import { loginUserImage } from '../../../../../../Core/shared functions/shared-functions-varibles';

@Component({
    selector: 'app-add-review-modal',
    imports: [
        LucideAngularModule,
        ReactiveFormsModule,
        CommonModule,
        FlatpickrModule,
        NgSelectModule,
    ],
    templateUrl: './add-review-modal.component.html',
    styleUrl: './add-review-modal.component.scss'
})
export class AddReviewModalComponent {
  @Input() config: any;
  reviewForm!: FormGroup;
  rating = 0;
  hovering = 0;

  constructor(public fb: FormBuilder, public modalService: ModalService) {
    this.reviewForm = this.fb.group({
      userName: ['', Validators.required],
      star: [null, Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [loginUserImage],
    });
  }

  ngOnInit() {
    if (this.config) {
      this.reviewForm.patchValue(this.config);
      this.rating = this.reviewForm.get('star')?.value;

    }
  }

  onSubmit(): void {
    if (!this.reviewForm.valid) {
      return;
    }

    const formData = this.reviewForm.value;
    this.modalService.close(formData);
  }

  closeModal() {
    this.modalService.close();
  }

  changeRating() {
    this.rating = this.reviewForm.get('star')?.value;
  }

  setRating(rating: number): void {
    this.rating = rating;
    this.reviewForm.controls['star'].setValue(rating);
  }
}
