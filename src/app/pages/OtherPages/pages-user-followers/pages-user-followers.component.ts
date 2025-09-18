import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pages-user-followers',
    imports: [LucideAngularModule, CommonModule, RouterLink],
    templateUrl: './pages-user-followers.component.html',
    styleUrl: './pages-user-followers.component.scss'
})
export class PagesUserFollowersComponent  {
  loadingButton = false;
  isActive = false;
  loadingButton2 = false;
  isActive2 = false;
  loadingButton3 = false;
  isActive3 = false;
  loadingButton4 = false;
  isActive4 = false;
  loadingButton5 = false;
  isActive5 = false;
  loadingButton6 = false;
  isActive6 = false;
  loadingButton7 = false;
  isActive7 = false;
  loadingButton8 = false;
  isActive8 = false;

  toggle(): void {
    this.loadingButton = true;
    setTimeout(() => {
      this.loadingButton = false;
      this.isActive = !this.isActive;
    }, 2000);
  }

  toggle2(): void {
    this.loadingButton2 = true;
    setTimeout(() => {
      this.loadingButton2 = false;
      this.isActive2 = !this.isActive2;
    }, 2000);
  }

  toggle3(): void {
    this.loadingButton3 = true;
    setTimeout(() => {
      this.loadingButton3 = false;
      this.isActive3 = !this.isActive3;
    }, 2000);
  }

  toggle4(): void {
    this.loadingButton4 = true;
    setTimeout(() => {
      this.loadingButton4 = false;
      this.isActive4 = !this.isActive4;
    }, 2000);
  }

  toggle5(): void {
    this.loadingButton5 = true;
    setTimeout(() => {
      this.loadingButton5 = false;
      this.isActive5 = !this.isActive5;
    }, 2000);
  }

  toggle6(): void {
    this.loadingButton6 = true;
    setTimeout(() => {
      this.loadingButton6 = false;
      this.isActive6 = !this.isActive6;
    }, 2000);
  }

  toggle7(): void {
    this.loadingButton7 = true;
    setTimeout(() => {
      this.loadingButton7 = false;
      this.isActive7 = !this.isActive7;
    }, 2000);
  }

  toggle8(): void {
    this.loadingButton8 = true;
    setTimeout(() => {
      this.loadingButton8 = false;
      this.isActive8 = !this.isActive8;
    }, 2000);
  }
}
