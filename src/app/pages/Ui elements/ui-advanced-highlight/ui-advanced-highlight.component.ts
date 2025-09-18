import { AfterViewInit, Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import * as Prism from 'prismjs';

@Component({
  selector: 'app-ui-advanced-highlight',
  imports: [PageTitleComponent],
  templateUrl: './ui-advanced-highlight.component.html',
  styleUrl: './ui-advanced-highlight.component.scss'
})
export class UiAdvancedHighlightComponent implements AfterViewInit {
  codeString: string = `<div x-data="{
    baseButtons: [
            { text: 'Primary', color: 'btn-primary'},
            { text: 'Purple', color: 'btn-purple'},
            { text: 'Green', color: 'btn-green'},
            { text: 'Red', color: 'btn-red'},
            { text: 'Yellow', color: 'btn-yellow'},
            { text: 'Sky', color: 'btn-sky'},
            { text: 'Pink', color: 'btn-pink'},
            { text: 'Indigo', color: 'btn-indigo'},
            { text: 'Orange', color: 'btn-orange'},
            { text: 'Dark', color: 'btn-gray'},
            { text: 'Light', color: 'bg-gray-200 text-gray-800 border-gray-200 hover:bg-gray-300 hover:text-gray-800 hover:border-gray-300 focus:bg-gray-300
            focus:text-gray-800 focus:border-gray-300'},
        ]
}" class="flex flex-wrap gap-4">
    <template x-for="(button, index) in baseButtons" :key="index">
        <button :class="button.color + ' btn'" x-text="button.text">
        </button>
    </template>
</div>`;

  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
