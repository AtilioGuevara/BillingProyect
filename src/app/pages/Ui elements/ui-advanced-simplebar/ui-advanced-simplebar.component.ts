import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
    selector: 'app-ui-advanced-simplebar',
    imports: [PageTitleComponent, SimplebarAngularModule],
    templateUrl: './ui-advanced-simplebar.component.html',
    styleUrl: './ui-advanced-simplebar.component.scss'
})
export class UiAdvancedSimplebarComponent {

  options = {
    autoHide: true, // Automatically hide the scrollbar
    scrollbarMaxSize: 0, // Maximum size of the scrollbar (0 for auto-sizing)
    scrollbarMinSize: 20, // Minimum size of the scrollbar
    scrollbarOpacity: 1, // Opacity of the scrollbar
    scrollbarTrackColor: '#f5f5f5', // Background color of the scrollbar track
    scrollbarThumbColor: '#888', // Color of the scrollbar thumb
    scrollbarThumbColorHover: '#555', // Color of the scrollbar thumb when hovered
    scrollbarThumbBorderRadius: '4px', // Border radius for the scrollbar thumb
    scrollbarTrackBorderRadius: '4px', // Border radius for the scrollbar track
  };

  primaryOptions = {
    autoHide: true,
    scrollbarMaxSize: 0, // Adjust as needed
    scrollbarMinSize: 20,
    scrollbarOpacity: 1,
    scrollbarTrackColor: '#f5f5f5', // Track color
    scrollbarThumbColor: '#888',    // Thumb color
    scrollbarThumbColorHover: '#555', // Thumb color on hover
    scrollbarThumbBorderRadius: '4px',
    scrollbarTrackBorderRadius: '4px',
  };
}
