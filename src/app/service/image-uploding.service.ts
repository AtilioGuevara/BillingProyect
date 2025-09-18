import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUplodingService {

  private readonly MAX_SIZE_MB = 5; // Max file size in MB
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

  constructor() { }

  uploadFile(event: any): Observable<string | ArrayBuffer | null> {
    const file = event.target.files[0];

    if (!file) {
      return of(null);
    }

    // Validation
    if (file.size > this.MAX_SIZE_MB * 1024 * 1024) {
      return throwError(() => new Error('File size exceeds the limit of 5 MB.'));
    }

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return throwError(() => new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }

    const reader = new FileReader();
    return new Observable((observer) => {
      reader.onload = () => {
        observer.next(reader.result);
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsDataURL(file);
    });
  }
}
