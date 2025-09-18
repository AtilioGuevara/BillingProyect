import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatpickrDirective } from './flatpickr.directive';

@NgModule({
  declarations: [FlatpickrDirective],
  imports: [CommonModule],
  exports: [FlatpickrDirective],
})
export class FlatpickrModule {}
