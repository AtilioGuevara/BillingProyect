import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownToggleDirective } from './domix-dropdown.directives';

@NgModule({
    declarations: [DropdownToggleDirective],
    imports: [CommonModule],
    exports: [DropdownToggleDirective],
})
export class DomixDropdownModule { }
