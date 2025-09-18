import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';
import jsVectorMap from 'jsvectormap';

@Component({
    selector: 'app-maps-vector',
    imports: [PageTitleComponent],
    templateUrl: './maps-vector.component.html',
    styleUrl: './maps-vector.component.scss'
})
export class MapsVectorComponent {
  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const mapsConfig = [
      {
        selector: '#world-map-markers',
        map: 'world',
        markersSelectable: true,
        markers: [],
        markerStyle: {
          initial: {
            fill: '#3f4d67',
          },
          hover: {
            fill: '#04a9f5',
          },
        },
        markerLabelStyle: {
          initial: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            fill: '#3f4d67',
          },
        },
      },
      {
        selector: '#markersMap',
        map: 'world',
        markersSelectable: true,
        markers: [
          {
            coords: [-14.235, -51.9253],
          },
          {
            coords: [35.8617, 104.1954],
          },
          {
            coords: [61, 105],
          },
          {
            coords: [26.8206, 30.8025],
          },
        ],
        markerStyle: {
          initial: {
            fill: '#3f4d67',
          },
          hover: {
            fill: '#04a9f5',
          },
        },
        markerLabelStyle: {
          initial: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            fill: '#3f4d67',
          },
        },
      },
      {
        selector: '#imageMarkersMap',
        map: 'world',
        markersSelectable: true,
        markers: [
          {
            name: 'Egypt',
            coords: [26.8206, 30.8025],
            style: {
              image: 'assets/images/others/pin.png',
            },
          },
          {
            name: 'United States',
            coords: [37.0902, -95.7129],
            style: {
              image: 'assets/images/others/pin.png',
            },
          },
          {
            name: 'United Kingdom',
            coords: [55.3781, 3.436],
            style: {
              image: 'assets/images/others/pin.png',
            },
          },
        ],
        markerStyle: {
          initial: {
            fill: '#3f4d67',
          },
          hover: {
            fill: '#04a9f5',
          },
        },
        markerLabelStyle: {
          initial: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            fill: '#3f4d67',
          },
        },
      },
      {
        selector: '#lineStyleMap',
        map: 'world',
        markersSelectable: true,
        markers: [
          {
            name: 'Brazil',
            coords: [-14.235, -51.9253],
            style: { fill: 'red' },
          },
          {
            name: 'Greenland',
            coords: [71.7069, -42.6043],
            style: { fill: 'green' },
          },
          {
            name: 'Egypt',
            coords: [26.8206, 30.8025],
            style: { fill: 'blue' },
          },
          {
            name: 'United States',
            coords: [37.0902, -95.7129],
            style: { fill: 'purple' },
          },
          {
            name: 'Norway',
            coords: [60.472, 8.4689],
            style: { fill: 'yellow' },
          },
        ],
        markerStyle: {
          initial: {
            fill: '#3f4d67',
          },
          hover: {
            fill: '#04a9f5',
          },
        },
        markerLabelStyle: {
          initial: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            fill: '#3f4d67',
          },
        },
      },
      {
        selector: '#tooltipMap',
        map: 'world',
        markersSelectable: true,
        onRegionTipShow: (
          e: any,
          el: { text: () => any; html: (arg0: string) => void },
          code: any
        ) => {
          const countryName = el.text();

          el.html(
            `<strong>${countryName}</strong><br>Custom Info: This is a custom tooltip!`
          ); 
        },
        markerStyle: {
          initial: {
            fill: '#3f4d67',
          },
          hover: {
            fill: '#04a9f5',
          },
        },
        markerLabelStyle: {
          initial: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            fill: '#3f4d67',
          },
        },
      },
      {
        selector: '#dataSeriesMap',
        map: 'world',
        markersSelectable: true,
        markers: [
          { coords: [61, 105] },
          { coords: [72, -42] },
          { coords: [56, -106] },
          { coords: [31.5, 34.8] },
          { coords: [-14.235, -51.9253] },
          { coords: [35.8617, 104.1954] },
        ],
        series: {
          markers: [
            {
              attribute: 'fill',
              legend: {
                title: 'Something (marker)',
              },
              scale: {
                mScale1: '#ffc371',
                mScale2: '#c79efd',
              },
              values: {
                0: 'mScale1',
                1: 'mScale2',
                2: 'mScale2',
              },
            },
          ],
        },
        markerStyle: {
          initial: {
            fill: '#3f4d67',
          },
          hover: {
            fill: '#04a9f5',
          },
        },
        markerLabelStyle: {
          initial: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            fill: '#3f4d67',
          },
        },
      },
      {
        selector: '#userLocationMap',
        map: 'world',
        markersSelectable: true,
        markers: [],
        series: {
          markers: [
            {
              attribute: 'fill',
              legend: {
                title: 'Something (marker)',
              },
              scale: {
                mScale1: '#ffc371',
                mScale2: '#c79efd',
              },
              values: {
                // Notice: the key must be a number of the marker.
                0: 'mScale1',
                1: 'mScale2',
                2: 'mScale2',
              },
            },
          ],
        },
        markerStyle: {
          initial: {
            fill: '#3f4d67',
          },
          hover: {
            fill: '#04a9f5',
          },
        },
        markerLabelStyle: {
          initial: {
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            fill: '#3f4d67',
          },
        },
      },
    ];
    // Initialize each map based on its configuration
    mapsConfig.forEach((config) => {
      new jsVectorMap({
        selector: config.selector,
        map: config.map,
        markers: config.markers || [],
        markerStyle: config.markerStyle || {},
        markerLabelStyle: config.markerLabelStyle || {},
        onRegionTipShow: config.onRegionTipShow,
      });
    });
  }
}
