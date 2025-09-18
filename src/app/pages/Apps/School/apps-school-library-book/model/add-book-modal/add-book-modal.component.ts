import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageUplodingService } from '../../../../../../service/image-uploding.service';

@Component({
    selector: 'app-add-book-modal',
    imports: [LucideAngularModule, ReactiveFormsModule, CommonModule],
    templateUrl: './add-book-modal.component.html',
    styleUrls: ['./add-book-modal.component.scss']
})
export class AddBookModalComponent {
  imageUrl: string | ArrayBuffer | null = null;

  constructor(
    private modalService: ModalService,
    public fb: FormBuilder,
    public imgUploading: ImageUplodingService
  ) {}

  @Input() config: any;
  fromGroup!: FormGroup;

  ngOnInit() {
    this.fromGroup = this.fb.group({
      image: ['', Validators.required],
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });

    if (this.config) {
      this.fromGroup.patchValue(this.config);
    }
  }

  onFileChange(event: any) {
    this.imgUploading.uploadFile(event).subscribe({
      next: (result) => {
        this.fromGroup.get('image')?.setValue(result);
      },
    });
  }

  closeaAddBookModal() {
    if (this.fromGroup.valid) {
      const formData = this.fromGroup.value;
      this.modalService.close(formData);
    }
  }
}
