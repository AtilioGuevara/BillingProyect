import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ui-gallery',
    imports: [PageTitleComponent, CommonModule],
    templateUrl: './ui-gallery.component.html',
    styleUrl: './ui-gallery.component.scss'
})
export class UiGalleryComponent {
  isOpen = false;
  imageSrc = '';
  images = [
    { src: 'assets/images/gallery/img-01.jpg' },
    { src: 'assets/images/gallery/img-02.jpg' },
    { src: 'assets/images/gallery/img-04.jpg' },
    { src: 'assets/images/gallery/img-05.jpg' },
    { src: 'assets/images/gallery/img-06.jpg' },
    { src: 'assets/images/gallery/img-03.jpg' },
    { src: 'assets/images/gallery/long/img-01.jpg' }
  ];

  openLightbox(src: string): void {
    this.imageSrc = src;
    this.isOpen = true;
  }

  closeLightbox(): void {
    this.isOpen = false;
  }

}
