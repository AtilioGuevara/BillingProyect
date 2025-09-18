import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private staticPart = 'Domiex - Angular 19 Admin & Dashboard  Template';

  constructor(private titleService: Title) { }

  // Function to capitalize the first letter of a string
  private capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // Set dynamic part of the title and append static part with capitalized first letter
  setTitle(dynamicPart: string): void {
    const capitalizedDynamicPart = this.capitalizeFirstLetter(dynamicPart);
    const fullTitle = `${capitalizedDynamicPart} | ${this.staticPart}`;
    this.titleService.setTitle(fullTitle);
  }

  // Optionally, you can retrieve the current title
  getTitle(): string {
    return this.titleService.getTitle();
  }
}
