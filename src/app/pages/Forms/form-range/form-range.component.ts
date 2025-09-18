import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
    selector: 'app-form-range',
    imports: [PageTitleComponent, CommonModule, NgxSliderModule],
    templateUrl: './form-range.component.html',
    styleUrl: './form-range.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormRangeComponent {
  minValue: number = 250;
  maxValue: number = 450;
  value6: number = 3;
  rValue: number = 128;
  gValue: number = 128;
  bValue: number = 128;
  value8: number = 14;

  options1: Options = {
    floor: 10,
    ceil: 1000,
    step: 5,
  };
  options6: Options = {
    floor: 0,
    ceil: 5,
    step: 1,
    showTicks: true,
    showTicksValues: true,
  };

  rOptions: Options = {
    floor: 0,
    ceil: 255,
    step: 1,
    showTicks: true,
    showTicksValues: false,
    getTickColor: () => '#000',
    getPointerColor: () => '#f00',
  };

  gOptions: Options = {
    floor: 0,
    ceil: 255,
    step: 1,
    showTicks: true,
    showTicksValues: false,
    getTickColor: () => '#000',
    getPointerColor: () => '#0f0',
  };

  bOptions: Options = {
    floor: 0,
    ceil: 255,
    step: 1,
    showTicks: true,
    showTicksValues: false,
    getTickColor: () => '#000',
    getPointerColor: () => '#00f',
  };

  updateColor() {
    const rgbColor = `rgb(${this.rValue}, ${this.gValue}, ${this.bValue})`;
    document.getElementById('RGB')!.style.backgroundColor = rgbColor;
  }

  options8: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
  };
}
