import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { DomixTooltipModule } from '../../../module/domix tooltip/domix-tooltip.module';

interface Singer {
  singerID: number;
  image: string;
  name: string;
  description: string;
}
@Component({
    selector: 'app-dashboard-music',
    imports: [
        PageTitleComponent,
        CommonModule,
        SimplebarAngularModule,
        FormsModule,
        LucideAngularModule,
        SimplebarAngularModule,
        DomixTooltipModule,
    ],
    templateUrl: './dashboard-music.component.html',
    styleUrl: './dashboard-music.component.scss'
})
export class DashboardMusicComponent {
  options = { autoHide: true };
  currentTime = 0;
  duration = 0;
  isPlaying = false;
  isMuted = false;
  volume = 50;
  previousVolume = 50;
  featuredSongs = [
    {
      id: 1,
      title: 'Love Me Like You Do',
      artist: 'Ellie Goulding',
      duration: '4:12 min',
      image: 'assets/images/dashboards/music/square/img-01.jpg',
    },
    {
      id: 2,
      title: 'Cheri Cheri Lady',
      artist: 'Modern Talking',
      duration: '3:45 min',
      image: 'assets/images/dashboards/music/square/img-02.jpg',
    },
    {
      id: 3,
      title: 'Summertime Sadness',
      artist: 'Lana Del Rey',
      duration: '4:25 min',
      image: 'assets/images/dashboards/music/square/img-03.jpg',
    },
    {
      id: 4,
      title: 'Until I Found You',
      artist: 'Stephen Sanchez',
      duration: '2:58 min',
      image: 'assets/images/dashboards/music/square/img-04.jpg',
    },
    {
      id: 5,
      title: 'Broken Angel (feat. Helena)',
      artist: 'Arash, Helena',
      duration: '3:11 min',
      image: 'assets/images/dashboards/music/square/img-05.jpg',
    },
  ];
  popularSingers: Singer[] = [
    {
      singerID: 1,
      image: 'assets/images/dashboards/music/singer/img-01.jpg',
      name: 'Ariana Grande',
      description:
        'A well-known pop singer with many hit albums, singles, and awards. She has a large fan base and connects with her followers on social media.',
    },
    {
      singerID: 2,
      image: 'assets/images/dashboards/music/singer/img-02.jpg',
      name: 'Billie Eilish',
      description:
        'A young, influential singer-songwriter known for her unique style and hits like "Bad Guy". Billie has made a significant impact on modern pop music.',
    },
    {
      singerID: 3,
      image: 'assets/images/dashboards/music/singer/img-03.jpg',
      name: 'Ed Sheeran',
      description:
        'A talented British singer-songwriter famous for his soulful lyrics and chart-topping hits. Ed has won multiple awards for his contributions to music.',
    },
    {
      singerID: 4,
      image: 'assets/images/dashboards/music/singer/img-04.jpg',
      name: 'Dua Lipa',
      description:
        'An English singer known for her powerful voice and catchy pop hits. Dua Lipa has garnered numerous awards and continues to influence the pop genre.',
    },
    {
      singerID: 5,
      image: 'assets/images/dashboards/music/singer/img-05.jpg',
      name: 'The Weeknd',
      description:
        'A Canadian artist with a distinctive voice and a string of successful albums. The Weeknd is known for his blend of R&B and pop music.',
    },
  ];
  currentSong = {
    id: 1,
    title: 'Love Me Like You Do',
    artist: 'Ellie Goulding',
    duration: '4:12 min',
    image: 'assets/images/dashboards/music/square/img-01.jpg',
  };

  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;

  ngOnInit() {
    this.updateDuration();
  }

  setCurrentSong(song: any) {
    this.audioRef.nativeElement.currentTime = 0;
    this.currentSong = song;
    this.isPlaying = false;
    this.togglePlay();
  }

  togglePlaySongs(song: any) {
    if (this.currentSong.id !== song.id) {
      this.setCurrentSong(song);
    } else {
      this.togglePlay();
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audioRef.nativeElement.pause();
    } else {
      this.audioRef.nativeElement.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  skip(seconds: number) {
    this.audioRef.nativeElement.currentTime = Math.min(
      this.duration,
      Math.max(0, this.audioRef.nativeElement.currentTime + seconds)
    );
    this.currentTime = this.audioRef.nativeElement.currentTime;
  }

  seek(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / rect.width) * this.duration;
    this.audioRef.nativeElement.currentTime = Math.min(
      this.duration,
      Math.max(0, newTime)
    );
    this.currentTime = this.audioRef.nativeElement.currentTime;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioRef.nativeElement.muted = this.isMuted;
    if (this.isMuted) {
      this.previousVolume = this.volume;
      this.volume = 0;
    } else {
      this.volume = this.previousVolume;
    }
  }

  updateVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = +input.value;
    this.audioRef.nativeElement.volume = this.volume / 100;
    this.isMuted = this.volume === 0;
  }

  updateTime() {
    this.currentTime = this.audioRef.nativeElement.currentTime;
  }

  updateDuration() {
    this.duration = this.audioRef.nativeElement.duration;
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
