import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  };
}

@Component({
    selector: 'app-maps-google',
    imports: [CommonModule, PageTitleComponent, GoogleMapsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './maps-google.component.html',
    styleUrls: ['./maps-google.component.scss']
})
export class MapsGoogleComponent {
  longitude = -77.028333;
  latitude = -12.043333;
  zoom: number = 9;

  @Input() pitch: number = 10;
  @Input() scrollwheel: boolean = false;
  center: any;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 48.8588548, lng: 2.347035 },
    zoom: 13,
  };

  markers: MarkerProperties[] = [
    { position: { lat: 48.8584, lng: 2.2945 } }, // Eiffel Tower
    { position: { lat: 48.8606, lng: 2.3376 } }, // Louvre Museum
    { position: { lat: 48.853, lng: 2.3499 } }, // Cathédrale Notre-Dame de Paris
  ];
}
