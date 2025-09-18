import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';

import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-ui-cards',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule, FormsModule],
    templateUrl: './ui-cards.component.html',
    styleUrl: './ui-cards.component.scss'
})
export class UiCardsComponent {
  cardUser = [
    {
      name: 'Linda J. Bell',
      role: 'Sr. Web Designer',
      galleryImage: 'assets/images/gallery/img-01.jpg',
      avatar: 'assets/images/avatar/user-21.png',
      stars: '2k',
      followers: '10k',
      projects: 15,
      isActive: false,
      loading: false,
    },
    {
      name: 'Jennifer Brunner',
      role: 'Laravel Developer',
      galleryImage: 'assets/images/gallery/img-02.jpg',
      avatar: 'assets/images/avatar/user-18.png',
      stars: '1.1k',
      followers: '2.5k',
      projects: 2,
      isActive: true,
      loading: false,
    },
    {
      name: 'Sandra Alexander',
      role: 'ASP.Net Developer',
      galleryImage: 'assets/images/gallery/img-03.jpg',
      avatar: 'assets/images/avatar/user-17.png',
      stars: '3.6k',
      followers: '12k',
      projects: 8,
      isActive: false,
      loading: false,
    },
    {
      name: 'James Hazelwood',
      role: 'Wordpress Developer',
      galleryImage: 'assets/images/gallery/img-04.jpg',
      avatar: 'assets/images/avatar/user-14.png',
      stars: '2.9k',
      followers: '11.8k',
      projects: 5,
      isActive: false,
      loading: false,
    },
  ];

  cards = [
    {
      bgClass: 'bg-primary-500',
      iconBgClass: 'bg-primary-500',
      icon: 'MessageCircleMore',
      description:
        'Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.',
      linkTextClass: 'text-primary-500 group-hover/item:text-white',
      arrowIcon: 'move-right',
    },
    {
      bgClass: 'bg-green-500',
      iconBgClass: 'bg-green-500',
      icon: 'MessageCircleMore',
      description:
        'Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.',
      linkTextClass: 'text-green-500 group-hover/item:text-white',
      arrowIcon: 'move-right',
    },
    {
      bgClass: 'bg-primary-500 bg-opacity-10',
      iconBgClass: 'bg-primary-500 bg-opacity-10',
      icon: 'messageCircleMore',
      description:
        'Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.',
      linkTextClass: 'text-primary-500 group-hover/item:text-primary-500',
      arrowIcon: 'move-right',
    },
    {
      bgClass: 'bg-purple-500 bg-opacity-10',
      iconBgClass: 'bg-purple-500 bg-opacity-10',
      icon: 'messageCircleMore',
      description:
        'Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.',
      linkTextClass: 'text-purple-500 group-hover/item:text-purple-500',
      arrowIcon: 'move-right',
    },
    {
      bgClass: 'bg-primary-500/15',
      iconBgClass: 'bg-primary-500/15',
      icon: 'Airplay',
      description:
        'Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.',
      linkTextClass: 'text-primary-500',
      arrowIcon: 'move-right',
    },
    {
      bgClass: 'bg-purple-500/15',
      iconBgClass: 'bg-purple-500/15',
      icon: 'Airplay',
      description:
        'Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.',
      linkTextClass: 'text-purple-500',
      arrowIcon: 'move-right',
    },
    {
      bgClass: 'bg-orange-500/15',
      iconBgClass: 'bg-orange-500/15',
      icon: 'Airplay',
      description:
        'Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.',
      linkTextClass: 'text-orange-500',
      arrowIcon: 'move-right',
    },
    {
      bgClass: 'bg-green-500/15',
      iconBgClass: 'bg-green-500/15',
      icon: 'Airplay',
      description:
        'Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.',
      linkTextClass: 'text-green-500',
      arrowIcon: 'move-right',
    },
  ];

  showSettings = false;
  bgcolor = 'bg-primary-500'; // Default background color
  fullName: string = 'Frankie N. Mixon';
  username: string = 'frankie_mixon';
  photoUrl: string = 'assets/images/avatar/user-18.png';
  editing: string | null = null; // Tracks which field is being edited
  followers: number = 11;
  following: number = 52;

  bgcolors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500']; // Example colors

  toggleSettings(): void {
    this.showSettings = !this.showSettings;
  }

  setBackgroundColor(color: string): void {
    this.bgcolor = color;
  }

  // saveEditing(): void {
  //   this.editing = '';
  // }

  // cancelEditing(): void {
  //   this.editing = '';
  // }

  toggleFollow(user: any) {
    user.loading = true;
    // Simulate an API call
    setTimeout(() => {
      user.isActive = !user.isActive;
      user.loading = false;
    }, 1000);
  }

  edit(field: string): void {
    this.editing = field;
  }

  // Save the changes and stop editing
  saveEdit(field: string): void {
    if (field === 'fullName' || field === 'username') {
      this.editing = null;
    }
  }

  // Discard the changes and stop editing
  discard(field: string): void {
    this.editing = null;
  }
}
