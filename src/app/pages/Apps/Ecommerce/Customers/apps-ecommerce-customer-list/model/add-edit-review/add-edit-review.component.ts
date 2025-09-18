import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { FlatpickrModule } from '../../../../../../../module/flatpickr/flatpickr.module';
import { ModalService } from '../../../../../../../Core/service/modal/modal.service';
import { emailPattern, emailValidator, generateRandomId, loginUserImage } from '../../../../../../../Core/shared functions/shared-functions-varibles';
import { ImageUplodingService } from '../../../../../../../service/image-uploding.service';

@Component({
    selector: 'app-add-edit-review',
    imports: [LucideAngularModule, ReactiveFormsModule, CommonModule, FlatpickrModule],
    templateUrl: './add-edit-review.component.html',
    styleUrl: './add-edit-review.component.scss'
})
export class AddEditReviewCustomerComponent {
  @Input() config: any;
  reviewForm !: FormGroup;
  rating = 0;
  hovering = 0;

  constructor(public fb: FormBuilder, public modalService: ModalService, public imgUploading: ImageUplodingService) {
    this.reviewForm = this.fb.group({
      customersName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\(?\d{1,3}\)?[\s-]?\d{2,4}[\s-]?\d{2,4}[\s-]?\d{2,4}$/)]],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      subscriber: ['Yes', Validators.required],
      status: ['Active', Validators.required],
      customersID: [generateRandomId()],

      image: [loginUserImage]
    })
  }



  ngOnInit() {
    if (this.config) {
      this.reviewForm.patchValue(this.config);
      this.rating = this.reviewForm.get('star')?.value;
    }
  }

  onSubmit(): void {
    if (!this.reviewForm.valid) {
      return
    }

    const formData = this.reviewForm.value;
    this.modalService.close(formData);
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imgUploading.uploadFile(event).subscribe({
        next: (result) => {
          this.reviewForm.get('image')?.setValue(result);
        },
      });
    }
  }

  closeModal() {
    this.modalService.close()
  }

  changeRating() {
    this.rating = this.reviewForm.get('star')?.value;
  }

  setRating(rating: number): void {
    this.rating = rating;
    this.reviewForm.controls['star'].setValue(rating);
  }

}
