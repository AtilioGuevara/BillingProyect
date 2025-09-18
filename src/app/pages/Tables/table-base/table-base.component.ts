import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-table-base',
    imports: [PageTitleComponent, CommonModule],
    templateUrl: './table-base.component.html',
    styleUrl: './table-base.component.scss'
})
export class TableBaseComponent {
  loading = true;
  data = [
    {
      name: 'Jeremy McMullen',
      age: 37,
      date: '21 Jan, 2024',
      address: 'United States',
      salary: '$15,236',
    },
    {
      name: 'Charles Fischer',
      age: 29,
      date: '28 Jan, 2024',
      address: 'Romania',
      salary: '$8,563',
    },
    {
      name: 'Louise Harms',
      age: 32,
      date: '02 Feb, 2024',
      address: 'Canada',
      salary: '$7,986',
    },
    {
      name: 'Henry Boyle',
      age: 34,
      date: '11 Feb, 2024',
      address: 'Germany',
      salary: '$36,322',
    },
    {
      name: 'John Brown',
      age: 26,
      date: '20 Feb, 2024',
      address: 'Mexico',
      salary: '$11,741',
    },
  ];

  wrestlers = [
    {
      name: '"Stone Cold" Steve Austin',
      moves: 'Stone Cold Stunner, Lou Thesz Press',
    },
    { name: 'Bret "The Hitman" Hart', moves: 'The Sharpshooter' },
    { name: 'Razor Ramon', moves: "Razor's Edge, Fallaway Slam" },
  ];

  rows = [
    {
      name: 'Jeremy McMullen',
      age: 37,
      date: '21 Jan, 2024',
      address: 'United States',
      salary: '$15,236',
    },
    {
      name: 'Charles Fischer',
      age: 29,
      date: '28 Jan, 2024',
      address: 'Romania',
      salary: '$8,563',
    },
    {
      name: 'Louise Harms',
      age: 32,
      date: '02 Feb, 2024',
      address: 'Canada',
      salary: '$7,986',
    },
    {
      name: 'Henry Boyle',
      age: 34,
      date: '11 Feb, 2024',
      address: 'Germany',
      salary: '$36,322',
    },
    {
      name: 'John Brown',
      age: 26,
      date: '20 Feb, 2024',
      address: 'Mexico',
      salary: '$11,741',
    },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2000); // Simulate loading delay
  }
  
  
}
