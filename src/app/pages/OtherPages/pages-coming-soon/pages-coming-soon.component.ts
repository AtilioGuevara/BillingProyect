import { Component, OnDestroy, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-pages-coming-soon',
    imports: [LucideAngularModule],
    templateUrl: './pages-coming-soon.component.html',
    styleUrl: './pages-coming-soon.component.scss'
})
export class PagesComingSoonComponent implements OnInit, OnDestroy {
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private timer: any;

  ngOnInit(): void {
    const deadline = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000); // 100 days countdown
    this.initializeClock(deadline);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private initializeClock(deadline: Date): void {
    this.timer = setInterval(() => {
      const now = new Date();
      const timeRemaining = deadline.getTime() - now.getTime();

      if (timeRemaining <= 0) {
        clearInterval(this.timer);
        this.days = this.hours = this.minutes = this.seconds = 0;
        return;
      }

      this.days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      this.seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    }, 1000);
  }
}
