import { Component, importProvidersFrom, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { NgxTooltipDirectivesModule, TooltipOptions, TooltipStrDirective } from 'ngx-tooltip-directives';
import { DomixTooltipModule } from '../../../module/domix tooltip/domix-tooltip.module';

const myDefaultTooltipOptions: TooltipOptions = {
  'backgroundColor': 'yellow'
}

@Component({
    selector: 'app-ui-tooltips',
    imports: [PageTitleComponent, DomixTooltipModule,],
    templateUrl: './ui-tooltips.component.html',
    styleUrl: './ui-tooltips.component.scss',
    providers: []
})
export class UiTooltipsComponent {

  // postion = {
  //   top= 50px,
  //   left= 50px
  // }


  tooltipShow = false;

  @ViewChild('myTooltip')tooltip!: TooltipStrDirective;

  ngOnInit(): void { }

  toggleTooltip() {
    if (!this.tooltipShow) {
      this.show();
    } else {
      this.hide();
    }
    this.tooltipShow = !this.tooltipShow;
  }

  show() {
    this.tooltip.show();
  }

  hide() {
    this.tooltip.hide();
  }
}

