import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-landing-email',
    imports: [LucideAngularModule, CommonModule, RouterLink],
    templateUrl: './landing-email.component.html',
    styleUrl: './landing-email.component.scss'
})
export class LandingEmailComponent {
  year: number;
  private stickyClass = 'scroll-sticky';
  currentYear: number = new Date().getFullYear();
  private threshold = 100;
  currentSection: string = 'services';
  isDarkMode: boolean = false;
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    this.updateStickyClass();
    AOS.init({
      duration: 2000, // Set default duration or override with data attributes
      once: true, // Choose whether animation should happen only once
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateStickyClass();
    this.detectCurrentSection();
  }
  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.currentSection = section;
    }
  }
  toggleMode() {
    const modeElement = document.querySelector('[data-mode]');
    if (modeElement) {
      const currentMode = modeElement.getAttribute('data-mode');
      const newMode = currentMode === 'light' ? 'dark' : 'light';

      // Set the new mode in the data attribute
      modeElement.setAttribute('data-mode', newMode);

      // Update the isDarkMode property
      this.isDarkMode = newMode === 'dark';

      // Optionally toggle a class on the body
      if (this.isDarkMode) {
        this.renderer.addClass(document.body, 'dark');
      } else {
        this.renderer.removeClass(document.body, 'dark');
      }
    }
  }

  private updateStickyClass(): void {
    const offset = window.pageYOffset || document.documentElement.scrollTop;
    if (offset > this.threshold) {
      this.renderer.addClass(
        this.el.nativeElement.querySelector('header'),
        this.stickyClass
      );
    } else {
      this.renderer.removeClass(
        this.el.nativeElement.querySelector('header'),
        this.stickyClass
      );
    }
  }
  selected: number | null = null;

  accordionItems = [
    {
      title: 'What are the features of email?',
      contentType: 'text',
      content: `Emails are automatically date and time stamped. Signatures can be attached. Files, graphics, and sound can be sent as attachments in compressed formats. Features include webmail and mobile email.`
    },
    {
      title: 'How do you use email features?',
      contentType: 'list',
      header: 'Change smart features & personalization settings',
      content: [
        'On your Android phone or tablet, open Gmail.',
        'Tap Menu > Settings > the account you want to change.',
        'Scroll to the "General" section.'
      ]
    },
    {
      title: 'What is the main use of email?',
      contentType: 'text',
      content: `Email is a convenient way to communicate with individuals or small groups. It enables users to send and receive documents, images, links, and other files. It provides flexibility to communicate on one's schedule, with notifications, reminders, and follow-ups.`
    },
    {
      title: 'How email really works?',
      contentType: 'text',
      content: `The email client (web, mobile, or desktop) connects to the Outgoing SMTP server using the email account. It hands over the email in MIME format to the SMTP server, which validates the sender's details and processes the message for sending.`
    },
    {
      title: 'What are emails used for?',
      contentType: 'text',
      content: `Email is used for various purposes, including contacting friends, communicating with supervisors, requesting information, and applying for jobs, internships, and scholarships.`
    }
  ];

  toggleItem(index: number): void {
    this.selected = this.selected === index ? null : index;
  }

  // Helper method to ensure content is an array for ngFor
  isArray(content: string | string[]): content is string[] {
    return Array.isArray(content);
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  private detectCurrentSection(): void {
    const sections = [
      'services',
      'pricing',
      'features',
      'templates',
      'faq',
      'updates',
    ];
    let currentSection = this.currentSection;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight * 0.5 &&
          rect.bottom >= window.innerHeight * 0.5
        ) {
          currentSection = section;
          break;
        }
      }
    }

    this.currentSection = currentSection;
  }
}
