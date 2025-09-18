import { NgModule } from '@angular/core';
import { NgxTooltipDirectivesModule, TooltipOptions } from 'ngx-tooltip-directives';

const myDefaultTooltipOptions: TooltipOptions = {
    backgroundColor: 'black',
    textColor: 'white',
    borderColor: 'black',
};

@NgModule({
    imports: [NgxTooltipDirectivesModule.forRoot(myDefaultTooltipOptions)],
    exports: [NgxTooltipDirectivesModule]
})
export class DomixTooltipModule { }