import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomixDropdownService {
  private openDropdowns: Set<HTMLElement> = new Set();

  register(dropdown: HTMLElement) {
    this.openDropdowns.add(dropdown);
  }

  unregister(dropdown: HTMLElement) {
    this.openDropdowns.delete(dropdown);
  }

  updateDropdowns(dataLevel: string) {
    if (dataLevel === "1") {
      let counter = 0;
      for (let dropdown of this.openDropdowns) {
        if (counter === 1) { 
          this.openDropdowns.delete(dropdown); // Remove it from the set
          dropdown.classList.remove('show');
          break;
        }
        counter++;
      }
    }
  }

  closeAll() {
    this.openDropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });
    this.openDropdowns.clear();
  }
}
