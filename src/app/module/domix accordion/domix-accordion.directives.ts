import { Directive, ElementRef, HostListener, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
    selector: '[domixAccordion]',
    standalone: false
})
export class DomixAccordionDirective implements OnInit {
    @Input() isOpenFirst: boolean | undefined; // Option to open the first accordion on load
    private isOpen = false;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        const allAccordions = this.el.nativeElement.parentElement.querySelectorAll('[domixAccordion]');

        if (this.isOpenFirst === undefined) {
            // If no isOpenFirst input is provided, open the first accordion
            if (allAccordions[0] === this.el.nativeElement) {
                this.openAccordion();
            }
        } else if (this.isOpenFirst) {
            // If isOpenFirst is true, open this accordion
            this.openAccordion();
        }

        this.setInitialIconState();
    }

    @HostListener('click')
    toggleAccordion() {
        this.isOpen ? this.closeAccordion() : this.openAccordion();
    }

    private setInitialIconState() {
        const actionIconDown = this.el.nativeElement.querySelector('[domixActionIconDown]') as HTMLElement;
        const actionIconUp = this.el.nativeElement.querySelector('[domixActionIconUp]') as HTMLElement;

        if (this.isOpen) {
            this.renderer.addClass(actionIconDown, 'hidden');
            this.renderer.removeClass(actionIconUp, 'hidden');
        } else {
            this.renderer.removeClass(actionIconDown, 'hidden');
            this.renderer.addClass(actionIconUp, 'hidden');
        }
    }

    private closeOtherAccordions() {
        const allAccordions = this.el.nativeElement.parentElement.querySelectorAll('[domixAccordion]');

        allAccordions.forEach((accordion: HTMLElement) => {
            if (accordion !== this.el.nativeElement) {
                const accContent = accordion.querySelector('[domixAccordianBody]') as HTMLElement;
                const accButton = accordion.querySelector('[domixAccordianHeader]') as HTMLElement;
                const accIconDown = accordion.querySelector('[domixActionIconDown]') as HTMLElement;
                const accIconUp = accordion.querySelector('[domixActionIconUp]') as HTMLElement;

                if (accContent && accButton && accIconDown && accIconUp) {
                    this.renderer.removeClass(accButton, 'active');
                    this.renderer.removeClass(accIconDown, 'hidden');
                    this.renderer.addClass(accIconUp, 'hidden');
                    this.renderer.setStyle(accContent, 'max-height', null);
                }
            }
        });
    }

    private openAccordion() {
        const content = this.el.nativeElement.querySelector('[domixAccordianBody]') as HTMLElement;
        const accordionButton = this.el.nativeElement.querySelector('[domixAccordianHeader]') as HTMLElement;
        const actionIconDown = this.el.nativeElement.querySelector('[domixActionIconDown]') as HTMLElement;
        const actionIconUp = this.el.nativeElement.querySelector('[domixActionIconUp]') as HTMLElement;

        if (!content || !accordionButton || !actionIconDown || !actionIconUp) {
            console.error('One or more accordion elements are missing in the DOM.');
            return;
        }

        this.closeOtherAccordions();

        const maxHeight = content.scrollHeight + 'px';
        this.renderer.setStyle(content, 'max-height', maxHeight);
        this.renderer.addClass(accordionButton, 'active');
        this.renderer.addClass(actionIconDown, 'hidden');
        this.renderer.removeClass(actionIconUp, 'hidden');
        this.isOpen = true;
    }

    private closeAccordion() {
        const content = this.el.nativeElement.querySelector('[domixAccordianBody]') as HTMLElement;
        const accordionButton = this.el.nativeElement.querySelector('[domixAccordianHeader]') as HTMLElement;
        const actionIconDown = this.el.nativeElement.querySelector('[domixActionIconDown]') as HTMLElement;
        const actionIconUp = this.el.nativeElement.querySelector('[domixActionIconUp]') as HTMLElement;

        if (!content || !accordionButton || !actionIconDown || !actionIconUp) {
            console.error('One or more accordion elements are missing in the DOM.');
            return;
        }

        this.renderer.removeClass(accordionButton, 'active');
        this.renderer.removeClass(actionIconDown, 'hidden');
        this.renderer.addClass(actionIconUp, 'hidden');
        this.renderer.setStyle(content, 'max-height', null);
        this.isOpen = false;
    }
}
