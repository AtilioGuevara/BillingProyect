import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DomixDropdownService } from './service/domix-dropdown.service';

@Directive({
    selector: '[domixDropdownToggle]',
    standalone: false
})
export class DropdownToggleDirective {
    @Input() dropdownMenu!: HTMLElement;
    @Input() shouldCloseAll: boolean = true;  // New input to control the closeAll functionality

    private isOpen = false;

    constructor(private el: ElementRef, private renderer: Renderer2, private dropdownService: DomixDropdownService) {

    }

    @HostListener('click', ['$event']) toggleDropdown(event: MouseEvent) {
        event.stopPropagation();

        const dataLevel = this.el.nativeElement.getAttribute('data-level');

        this.dropdownService.updateDropdowns(dataLevel);
        this.isOpen = this.el.nativeElement.nextElementSibling.classList.contains('show');
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            if (this.shouldCloseAll) {
                this.dropdownService.closeAll();
            }
            this.openDropdown();
            this.calculatePosition();
        }
    }

    @HostListener('document:click', ['$event']) onClickOutside(event: MouseEvent) {
        const clickedInside = this.el.nativeElement.contains(event.target);
        if (!clickedInside && this.isOpen) {
            this.closeDropdown();
        }
    }

    private openDropdown() {
        this.renderer.addClass(this.dropdownMenu, 'show');
        this.isOpen = true;
        this.dropdownService.register(this.dropdownMenu);
    }

    private closeDropdown() {
        this.renderer.removeClass(this.dropdownMenu, 'show');
        this.isOpen = false;
        this.dropdownService.unregister(this.dropdownMenu);
    }

    getRightLeft(buttonRect: any, dropdown: any) {
        let data = {
            left: 0,
            top: 0
        };
        if (buttonRect.x - dropdown.offsetWidth < 0) {
            data.top = buttonRect.bottom;
            data.left = buttonRect.left;
        }
        if (window.innerHeight < buttonRect.top + dropdown.offsetHeight) {
            data.top = buttonRect.top - dropdown.clientHeight;
            data.left = buttonRect.left;
        }
        return data;
    }

    getLeft(buttonRect: any, dropdown: any) {
        let data = {
            left: 0,
            top: 0
        };
        if (window.innerWidth < buttonRect.right + dropdown.offsetWidth) {
            data.top = buttonRect.bottom;
            data.left = buttonRect.right - dropdown.clientWidth;
        }
        if (window.innerHeight < buttonRect.top + dropdown.offsetHeight) {
            data.top = (buttonRect.bottom - dropdown.offsetHeight) - buttonRect.height;
            data.left = buttonRect.right - dropdown.clientWidth;
        }
        return data;
    }

    getTopRight(buttonRect: any, dropdown: any) {
        let data = {
            left: 0,
            top: 0
        };
        if (window.innerWidth < buttonRect.right + dropdown.offsetWidth) {
            data.top = buttonRect.top;
            data.left = buttonRect.left - dropdown.clientWidth;
        }
        if (window.innerHeight < buttonRect.top + dropdown.offsetHeight) {
            data.top = (buttonRect.bottom - dropdown.offsetHeight) - buttonRect.height;
            data.left = buttonRect.right - dropdown.clientWidth;
        }
        return data;
    }

    private calculatePosition() {
        const buttonRect = this.el.nativeElement.getBoundingClientRect();
        const dropdown = this.dropdownMenu;
        const position = dropdown.getAttribute('dropdown-position') || 'left';

        let left = 0;
        let top = 0;

        switch (position) {
            case 'left':
                const data = this.getLeft(buttonRect, dropdown);
                if (data.top > 0 || data.left > 0) {
                    top = data.top;
                    left = data.left;
                }
                if (top == 0 && left == 0) {
                    top = buttonRect.bottom;
                    left = buttonRect.left;
                }
                break;
            case 'right':
                const data1 = this.getRightLeft(buttonRect, dropdown);
                if (data1.top > 0 || data1.left > 0) {
                    top = data1.top;
                    left = data1.left;
                }
                if (top == 0 && left == 0) {
                    top = buttonRect.bottom;
                    left = buttonRect.right - dropdown.clientWidth;
                }
                break;
            case 'right-top':
                const data2 = this.getTopRight(buttonRect, dropdown);
                if (data2.top > 0 || data2.left > 0) {
                    top = data2.top;
                    left = data2.left;
                }
                if (top == 0 && left == 0) {
                    top = buttonRect.top;
                    left = buttonRect.right;
                }
                break;
            case 'left-top':
                const data3 = this.getRightLeft(buttonRect, dropdown);
                if (data3.top > 0 || data3.left > 0) {
                    top = data3.top;
                    left = data3.left;
                }
                if (top == 0 && left == 0) {
                    top = buttonRect.top;
                    left = buttonRect.left - dropdown.offsetWidth;
                }
                break;
            default:
                const data4 = this.getLeft(buttonRect, dropdown);
                if (data4.top > 0 || data4.left > 0) {
                    top = data4.top;
                    left = data4.left;
                }
                if (top == 0 && left == 0) {
                    top = buttonRect.bottom;
                    left = buttonRect.left;
                }
                break;
        }
        this.renderer.setStyle(dropdown, 'left', `${Math.max(0, left)}px`);
        this.renderer.setStyle(dropdown, 'top', `${Math.max(0, top)}px`);
    }
}
