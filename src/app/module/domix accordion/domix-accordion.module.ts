import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomixAccordionDirective } from './domix-accordion.directives';

@NgModule({
    declarations: [DomixAccordionDirective],
    imports: [CommonModule],
    exports: [DomixAccordionDirective],
})
export class DomixAccordionModule { }
