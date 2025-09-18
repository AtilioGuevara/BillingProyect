import { Component, OnInit } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-select',
    imports: [PageTitleComponent, NgSelectModule],
    templateUrl: './form-select.component.html',
    styleUrl: './form-select.component.scss'
})
export class FormSelectComponent {
  selectedCity: any;
  sampleSelectOptions = [
    { label: 'Option 1', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
    { label: 'Option 3', value: 'Option 3' },
  ];
  searchBoxOptions = [
    { label: 'Option 1', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
    { label: 'Option 3', value: 'Option 3' },
  ];
  multipleOptions = [
    { label: 'Offline', value: 'Offline' },
    { label: 'Online', value: 'Online' },
  ];
  multipleWithoutOptions = [
    { label: 'Offline', value: 'Offline' },
    { label: 'Online', value: 'Online' },
  ];
  disabledOptions = [
    { label: 'Offline', value: 'Offline', disabled: false },
    { label: 'Online', value: 'Online', disabled: true },
  ];
  optionGroupOptions = [
    { label: 'Options 1', value: 'Options 1', options: 'options1' },
    { label: 'Options 2', value: 'Options 2', options: 'options1' },
    { label: 'Options 1', value: 'Options 1', options: 'options2' },
    { label: 'Options 2', value: 'Options 2', options: 'options2' },
    { label: 'Options 3', value: 'Options 3', options: 'options2' },
    { label: 'Options 1', value: 'Options 1', options: 'options3' },
    { label: 'Options 2', value: 'Options 2', options: 'options3' },
    { label: 'Options 1', value: 'Options 1', options: 'options4' },
  ];
  preselectOptions = [
    { label: 'Options 1', value: 'Options 1' },
    { label: 'Options 2', value: 'Options 2' },
    { label: 'Options 3', value: 'Options 3' },
    { label: 'Options 4', value: 'Options 4' },
    { label: 'Options 5', value: 'Options 5' },
    { label: 'Options 6', value: 'Options 6' },
    { label: 'Options 7', value: 'Options 7' },
    { label: 'Options 8', value: 'Options 8' },
  ];
  preselectMultipleValueOptions = [
    { label: 'Options 1', value: 'Options 1' },
    { label: 'Options 2', value: 'Options 2' },
    { label: 'Options 3', value: 'Options 3' },
    { label: 'Options 4', value: 'Options 4' },
    { label: 'Options 5', value: 'Options 5' },
    { label: 'Options 6', value: 'Options 6' },
    { label: 'Options 7', value: 'Options 7' },
    { label: 'Options 8', value: 'Options 8' },
  ];
  hideClearButtonOptions = [
    { label: 'Options 1', value: 'Options 1' },
    { label: 'Options 2', value: 'Options 2' },
    { label: 'Options 3', value: 'Options 3' },
    { label: 'Options 4', value: 'Options 4' },
    { label: 'Options 5', value: 'Options 5' },
    { label: 'Options 6', value: 'Options 6' },
    { label: 'Options 7', value: 'Options 7' },
    { label: 'Options 8', value: 'Options 8' },
  ];
  customWidthDropboxOptions = [
    { label: 'Options 1', value: 'Options 1' },
    { label: 'Options 2', value: 'Options 2' },
    { label: 'Options 3', value: 'Options 3' },
    { label: 'Options 4', value: 'Options 4' },
    { label: 'Options 5', value: 'Options 5' },
    { label: 'Options 6', value: 'Options 6' },
    { label: 'Options 7', value: 'Options 7' },
    { label: 'Options 8', value: 'Options 8' },
  ];
  allowNewOption = [
    { label: 'Options 1', value: 'Options 1' },
    { label: 'Options 2', value: 'Options 2' },
    { label: 'Options 3', value: 'Options 3' },
    { label: 'Options 4', value: 'Options 4' },
    { label: 'Options 5', value: 'Options 5' },
    { label: 'Options 6', value: 'Options 6' },
    { label: 'Options 7', value: 'Options 7' },
    { label: 'Options 8', value: 'Options 8' },
  ];
  markMatchedcontributorOptions = [
    { label: 'Options 1', value: 'Options 1' },
    { label: 'Options 2', value: 'Options 2' },
    { label: 'Options 3', value: 'Options 3' },
    { label: 'Options 4', value: 'Options 4' },
    { label: 'Options 5', value: 'Options 5' },
    { label: 'Options 6', value: 'Options 6' },
    { label: 'Options 7', value: 'Options 7' },
    { label: 'Options 8', value: 'Options 8' },
  ];
  showingSelectedOption = [
    { label: 'Offline', value: 'Offline' },
    { label: 'Online', value: 'Online' },
  ];
  aliasForSearchingOption = [
    { label: 'Colors', value: 'Colors' },
    { label: 'Fruits', value: 'Fruits' },
    { label: 'Months', value: 'Months' },
    { label: 'Others', value: 'Others' },
  ];
  maximumValuesOption = [
    { label: 'Offline', value: 'Offline' },
    { label: 'Online', value: 'Online' },
  ];
  labelDescriptionOption = [
    { label: 'Offline', value: 'Offline' },
    { label: 'Online', value: 'Online' },
  ];
  showOptionOnlySearchOption = [
    { label: 'Options 1', value: 'Options 1' },
    { label: 'Options 2', value: 'Options 2' },
    { label: 'Options 3', value: 'Options 3' },
    { label: 'Options 4', value: 'Options 4' },
    { label: 'Options 5', value: 'Options 5' },
    { label: 'Options 6', value: 'Options 6' },
    { label: 'Options 7', value: 'Options 7' },
    { label: 'Options 8', value: 'Options 8' },
  ];
  nativeOptions = [
    { label: 'Options 1', value: 'Options 1' },
    { label: 'Options 2', value: 'Options 2' },
    { label: 'Options 3', value: 'Options 3' },
    { label: 'Options 4', value: 'Options 4' },
    { label: 'Options 5', value: 'Options 5' },
    { label: 'Options 6', value: 'Options 6' },
    { label: 'Options 7', value: 'Options 7' },
    { label: 'Options 8', value: 'Options 8' },
  ];
  sampleimageOptions = [
    {
      id: 1,
      name: 'Vilnius',
      avatar:
        '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x',
    },
    {
      id: 2,
      name: 'Kaunas',
      avatar:
        '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15',
    },
    {
      id: 3,
      name: 'Pavilnys',
      avatar:
        '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15',
    },
  ];
  valueTagOptions = [
    { label: 'Options 1', value: 'Options 1' },
    { label: 'Options 2', value: 'Options 2' },
    { label: 'Options 3', value: 'Options 3' },
    { label: 'Options 4', value: 'Options 4' },
    { label: 'Options 5', value: 'Options 5' },
    { label: 'Options 6', value: 'Options 6' },
    { label: 'Options 7', value: 'Options 7' },
    { label: 'Options 8', value: 'Options 8' },
  ];
}
