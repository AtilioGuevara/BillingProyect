import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-input-spin',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule, FormsModule],
    templateUrl: './form-input-spin.component.html',
    styleUrl: './form-input-spin.component.scss'
})
export class FormInputSpinComponent {
  counters = [
    { count: 1, class: 'input-spin-primary', color: 'primary' },
    { count: 1, class: 'input-spin-purple', color: 'purple' },
    { count: 1, class: 'input-spin-green', color: 'green' },
    { count: 1, class: 'input-spin-red', color: 'orange' },
    { count: 1, class: 'input-spin-yellow', color: 'yellow' },
    { count: 1, class: 'input-spin-sky', color: 'sky' },
  ];
   counts: number[] = [1, 1, 1, 1, 1]; 

   increment(index: number) {
    this.counters[index].count++;
  }

  decrement(index: number) {
    if (this.counters[index].count > 0) {
      this.counters[index].count--;
    }
  }

  incrementBoxed(index: number) {
    this.counts[index]++;
  }

  decrementBoxed(index: number) {
    if (this.counts[index] > 1) { // Prevent going below 1
      this.counts[index]--;
    }
  }

  count1: number = 10;
  count2: number = 20;

  // Increment and Decrement Functions
  incrementCounter(counter: number): number {
    return counter + 1;
  }

  decrementCounter(counter: number): number {
    return counter > 0 ? counter - 1 : 0; // Prevent negative values
  }
}
