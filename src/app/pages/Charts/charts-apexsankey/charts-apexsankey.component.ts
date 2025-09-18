import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColorService } from '../../../service/color.service';
import ApexSankey from 'apexsankey';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';

@Component({
    selector: 'app-charts-apexsankey',
    imports: [PageTitleComponent],
    templateUrl: './charts-apexsankey.component.html',
    styleUrl: './charts-apexsankey.component.scss'
})
export class ChartsApexsankeyComponent {
  @ViewChild('apexSankeyContainer') apexSankeyContainer!: ElementRef;
  @ViewChild('nodeCustomizationContainer') nodeCustomizationContainer!: ElementRef;
  @ViewChild('edgeCustomizationContainer') edgeCustomizationContainer!: ElementRef;
  @ViewChild('fontCustomizationContainer') fontCustomizationContainer!: ElementRef;

  colorCodes: string[] = [];
  s: any;
  Data: any;
  graphOptions: any;
  dataForSecondChart: any;
  graphOptionsForSecondChart: any;
  edgeOptionsChart: any;
  dataForEdgeChart: any;

  fontOptionsChart: any;
  dataForFontChart: any;

  constructor(private colorService: ColorService) {
    this.colorCodes = this.colorService.getColorCodes(['bg-gray-800', 'bg-white', 'bg-gray-200']);
  }

  ngAfterViewInit() {
    this.initializeData();
    this.renderSankey();

    this.initializeSecondData();
    this.renderSecondSankey();

    this.initializeEdgeData();
    this.renderEdgeSankey();

    this.initializeFontData();
    this.renderFontSankey();



    window.addEventListener('resize', this.reloadSankey.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.reloadSankey.bind(this));
  }

  initializeData() {
    this.Data = {
      nodes: [
        { id: 'Oil', title: 'Oil' },
        { id: 'Natural Gas', title: 'Natural Gas' },
        { id: 'Coal', title: 'Coal' },
        { id: 'Fossil Fuels', title: 'Fossil Fuels' },
        { id: 'Electricity', title: 'Electricity' },
        { id: 'Energy', title: 'Energy' }
      ],
      edges: [
        { source: 'Oil', target: 'Fossil Fuels', value: 15 },
        { source: 'Natural Gas', target: 'Fossil Fuels', value: 20 },
        { source: 'Coal', target: 'Fossil Fuels', value: 25 },
        { source: 'Coal', target: 'Electricity', value: 25 },
        { source: 'Fossil Fuels', target: 'Energy', value: 60 },
        { source: 'Electricity', target: 'Energy', value: 25 }
      ]
    };

    this.graphOptions = {
      nodeWidth: 20,
      fontWeight: 500,
      fontSize: '10px',
      height: 300,
      fontColor: this.colorCodes[0],
      canvasStyle: '',
      tooltipBGColor: this.colorCodes[1],
      tooltipBorderColor: this.colorCodes[2],
      nodeTemplate: (source: any, target: any, value: any) => {
        return `<div class="flex items-center gap-2">
                  <div class="size-3" style='background-color:${source.color}'></div>
                  <h6>${source.title}</h6>
                  <div>=></div>
                  <div class="size-3" style='background-color:${target.color}'></div>
                  <h6>${target.title}</h6>
                  <div>: ${value}</div> 
                </div>`;
      }
    };
  }

  initializeSecondData() {
    this.dataForSecondChart = {
      nodes: [
        { id: 'Applications', title: 'Applications' },
        { id: 'Accepted', title: 'Accepted' },
        { id: 'Rejected', title: 'Rejected' },
        { id: 'In Progress', title: 'In Progress' },
        { id: 'Software Engineering', title: 'Software Engineering' },
        { id: 'Data Science', title: 'Data Science' },
        { id: 'Marketing', title: 'Marketing' },
        { id: 'Sales', title: 'Sales' },
        { id: 'HR', title: 'HR' },
        { id: 'Finance', title: 'Finance' },
        { id: 'Internship', title: 'Internship' },
        { id: 'Junior', title: 'Junior' },
        { id: 'Mid-level', title: 'Mid-level' },
        { id: 'Senior', title: 'Senior' },
        { id: 'Entry Level', title: 'Entry Level' },
        { id: 'Full-time', title: 'Full-time' },
        { id: 'Part-time', title: 'Part-time' },
      ],
      edges: [
        { source: 'Applications', target: 'Accepted', value: 10 },
        { source: 'Applications', target: 'Rejected', value: 15 },
        { source: 'Applications', target: 'In Progress', value: 10 },
        { source: 'Accepted', target: 'Software Engineering', value: 4 },
        { source: 'Accepted', target: 'Data Science', value: 2 },
        { source: 'Accepted', target: 'Marketing', value: 1 },
        { source: 'Accepted', target: 'Sales', value: 1 },
        { source: 'Accepted', target: 'HR', value: 1 },
        { source: 'Accepted', target: 'Finance', value: 1 },
        { source: 'Rejected', target: 'Software Engineering', value: 5 },
        { source: 'Rejected', target: 'Data Science', value: 3 },
        { source: 'Rejected', target: 'Marketing', value: 2 },
        { source: 'Rejected', target: 'Sales', value: 2 },
        { source: 'Rejected', target: 'HR', value: 2 },
        { source: 'Rejected', target: 'Finance', value: 1 },
        { source: 'In Progress', target: 'Software Engineering', value: 3 },
        { source: 'In Progress', target: 'Data Science', value: 2 },
        { source: 'In Progress', target: 'Marketing', value: 2 },
        { source: 'In Progress', target: 'Sales', value: 1 },
        { source: 'In Progress', target: 'HR', value: 1 },
        { source: 'In Progress', target: 'Finance', value: 1 },
        { source: 'Software Engineering', target: 'Internship', value: 1 },
        { source: 'Software Engineering', target: 'Junior', value: 1 },
        { source: 'Software Engineering', target: 'Mid-level', value: 1 },
        { source: 'Software Engineering', target: 'Senior', value: 1 },
        { source: 'Software Engineering', target: 'Entry Level', value: 1 },
        { source: 'Data Science', target: 'Internship', value: 1 },
        { source: 'Data Science', target: 'Junior', value: 1 },
        { source: 'Data Science', target: 'Mid-level', value: 1 },
        { source: 'Data Science', target: 'Senior', value: 1 },
        { source: 'Data Science', target: 'Entry Level', value: 1 },
        { source: 'Marketing', target: 'Internship', value: 1 },
        { source: 'Marketing', target: 'Junior', value: 1 },
        { source: 'Marketing', target: 'Mid-level', value: 1 },
        { source: 'Marketing', target: 'Senior', value: 1 },
        { source: 'Marketing', target: 'Entry Level', value: 1 },
        { source: 'Sales', target: 'Internship', value: 1 },
        { source: 'Sales', target: 'Junior', value: 1 },
        { source: 'Sales', target: 'Mid-level', value: 1 },
        { source: 'Sales', target: 'Senior', value: 1 },
        { source: 'Sales', target: 'Entry Level', value: 1 },
        { source: 'HR', target: 'Internship', value: 1 },
        { source: 'HR', target: 'Junior', value: 1 },
        { source: 'HR', target: 'Mid-level', value: 1 },
        { source: 'HR', target: 'Senior', value: 1 },
        { source: 'HR', target: 'Entry Level', value: 1 },
        { source: 'Finance', target: 'Internship', value: 1 },
        { source: 'Finance', target: 'Junior', value: 1 },
        { source: 'Finance', target: 'Mid-level', value: 1 },
        { source: 'Finance', target: 'Senior', value: 1 },
        { source: 'Finance', target: 'Entry Level', value: 1 },
        { source: 'Internship', target: 'Full-time', value: 1 },
        { source: 'Internship', target: 'Part-time', value: 1 },
        { source: 'Junior', target: 'Full-time', value: 1 },
        { source: 'Junior', target: 'Part-time', value: 1 },
        { source: 'Mid-level', target: 'Full-time', value: 1 },
        { source: 'Mid-level', target: 'Part-time', value: 1 },
        { source: 'Senior', target: 'Full-time', value: 1 },
        { source: 'Senior', target: 'Part-time', value: 1 },
        { source: 'Entry Level', target: 'Full-time', value: 1 },
        { source: 'Entry Level', target: 'Part-time', value: 1 },
      ],
    };

    this.graphOptionsForSecondChart = {
      nodeWidth: 20,
      fontWeight: 500,
      fontSize: '10px',
      height: 300,
      fontColor: this.colorCodes[0],
      canvasStyle: '',
      nodeBorderColor: this.colorCodes[2],
      tooltipBGColor: this.colorCodes[1],
      tooltipBorderColor: this.colorCodes[2],
      edgeGradientFill: false,
      nodeTemplate: (source: any, target: any, value: any) => {
        return `
    <div class="flex items-center gap-2">
      <div class="size-3" style='background-color:${source.color}'></div>
      <h6 class="dark:text-dark-100">${source.title}</h6>
      <div>=></div>
      <div class="size-3" style='background-color:${target.color}'></div>
      <h6 class="dark:text-dark-100">${target.title}</h6>
      <div>: ${value}</div> 
    </div>
  `;
      }
    };
  }

  initializeEdgeData() {
    this.dataForEdgeChart = {
      nodes: [
        { id: 'England', title: 'england' },
        { id: 'Wales', title: 'wales' },
        { id: 'Level 4', title: 'level 4' },
        { id: 'Level 3', title: 'level 3' },
        { id: 'Level 2', title: 'level 2' },
        { id: 'Level 1 and entry level', title: 'level 1 and entry level' },
        { id: 'No qualifications', title: 'no qualifications' },
        { id: 'Other', title: 'other' },
        { id: 'Wholesale & retail', title: 'wholesale & retail' },
        { id: 'Health & social work', title: 'health & social work' },
        { id: 'Education', title: 'education' },
        { id: 'Construction', title: 'construction' },
        { id: 'Manufacturing', title: 'manufacturing' },
        { id: 'Transport & storage', title: 'transport & storage' },
        { id: 'Finance & insurance', title: 'finance & insurance' },
      ],
      edges: [
        { source: 'England', target: 'Level 4', value: 13 },
        { source: 'England', target: 'Level 3', value: 8 },
        { source: 'England', target: 'Level 2', value: 8 },
        { source: 'England', target: 'Level 1 and entry level', value: 6 },
        { source: 'England', target: 'No qualifications', value: 3 },
        // { source: 'England', target: 'Other', value: 4 },
        { source: 'Wales', target: 'Level 4', value: 7 },
        { source: 'Wales', target: 'Level 3', value: 8 },
        { source: 'Wales', target: 'Level 2', value: 4 },
        { source: 'Wales', target: 'Level 1 and entry level', value: 5 },
        { source: 'Wales', target: 'No qualifications', value: 5 },
        // { source: 'Wales', target: 'Other', value: 3 },
        { source: 'Level 4', target: 'Wholesale & retail', value: 4 },
        { source: 'Level 4', target: 'Health & social work', value: 3 },
        { source: 'Level 4', target: 'Education', value: 2 },
        { source: 'Level 4', target: 'Construction', value: 1 },
        { source: 'Level 4', target: 'Manufacturing', value: 2 },
        { source: 'Level 4', target: 'Other', value: 3 },
        { source: 'Level 4', target: 'Transport & storage', value: 2 },
        { source: 'Level 4', target: 'Finance & insurance', value: 3 },
        { source: 'Level 3', target: 'Wholesale & retail', value: 3 },
        { source: 'Level 3', target: 'Health & social work', value: 2 },
        { source: 'Level 3', target: 'Education', value: 1 },
        { source: 'Level 3', target: 'Construction', value: 2 },
        { source: 'Level 3', target: 'Manufacturing', value: 1 },
        { source: 'Level 3', target: 'Other', value: 3 },
        { source: 'Level 3', target: 'Transport & storage', value: 2 },
        { source: 'Level 3', target: 'Finance & insurance', value: 2 },
        { source: 'Level 2', target: 'Wholesale & retail', value: 2 },
        { source: 'Level 2', target: 'Health & social work', value: 1 },
        { source: 'Level 2', target: 'Education', value: 2 },
        { source: 'Level 2', target: 'Construction', value: 1 },
        { source: 'Level 2', target: 'Manufacturing', value: 2 },
        { source: 'Level 2', target: 'Other', value: 2 },
        { source: 'Level 2', target: 'Transport & storage', value: 1 },
        { source: 'Level 2', target: 'Finance & insurance', value: 1 },
        { source: 'Level 1 and entry level', target: 'Wholesale & retail', value: 1 },
        { source: 'Level 1 and entry level', target: 'Health & social work', value: 2 },
        { source: 'Level 1 and entry level', target: 'Education', value: 1 },
        { source: 'Level 1 and entry level', target: 'Construction', value: 2 },
        { source: 'Level 1 and entry level', target: 'Manufacturing', value: 1 },
        { source: 'Level 1 and entry level', target: 'Other', value: 2 },
        { source: 'Level 1 and entry level', target: 'Transport & storage', value: 1 },
        { source: 'Level 1 and entry level', target: 'Finance & insurance', value: 1 },
        { source: 'No qualifications', target: 'Wholesale & retail', value: 1 },
        { source: 'No qualifications', target: 'Health & social work', value: 1 },
        { source: 'No qualifications', target: 'Education', value: 1 },
        { source: 'No qualifications', target: 'Construction', value: 1 },
        { source: 'No qualifications', target: 'Manufacturing', value: 1 },
        { source: 'No qualifications', target: 'Other', value: 1 },
        { source: 'No qualifications', target: 'Transport & storage', value: 1 },
        { source: 'No qualifications', target: 'Finance & insurance', value: 1 },
      ],
    };

    this.edgeOptionsChart = {
      nodeWidth: 20,
      fontWeight: 500,
      fontSize: '10px',
      height: 300,
      fontColor: this.colorCodes[0],
      canvasStyle: '',
      nodeBorderColor: this.colorCodes[2],
      tooltipBGColor: this.colorCodes[1],
      tooltipBorderColor: this.colorCodes[2],
      edgeOpacity: 0.2,
      nodeTemplate: (source: any, target: any, value: any) => {
        `<div class="flex items-center gap-2">
                            <div class="size-3" style='background-color:${source.color}'></div>
                            <h6 class="dark:text-dark-100">${source.title}</h6>
                            <div>=></div>
                            <div class="size-3" style='background-color:${target.color}'></div>
                            <h6 class="dark:text-dark-100">${target.title}</h6>
                            <div>: ${value}</div> 
                        </div>`;
      },
    };
  }

  initializeFontData() {
    this.dataForFontChart = {
      nodes: [
        { id: 'Berlin', title: 'Berlin' },
        { id: 'Job Applications', title: 'Job Applications' },
        { id: 'Barcelona', title: 'Barcelona' },
        { id: 'Madrid', title: 'Madrid' },
        { id: 'Amsterdam', title: 'Amsterdam' },
        { id: 'Paris', title: 'Paris' },
        { id: 'London', title: 'London' },
        { id: 'Munich', title: 'Munich' },
        { id: 'Brussels', title: 'Brussels' },
        { id: 'Dubai', title: 'Dubai' },
        { id: 'Dublin', title: 'Dublin' },
        { id: 'Other Cities', title: 'Other Cities' },
        { id: 'No Response', title: 'No Response' },
        { id: 'Responded', title: 'Responded' },
        { id: 'Rejected', title: 'Rejected' },
        { id: 'Interviewed', title: 'Interviewed' },
        { id: 'No Offer', title: 'No Offer' },
        { id: 'Declined Offer', title: 'Declined Offer' },
        { id: 'Accepted Offer', title: 'Accepted Offer' },
      ],
      edges: [
        {
          source: 'Berlin',
          target: 'Job Applications',
          value: 102,
          color: '#dddddd',
        },
        {
          source: 'Barcelona',
          target: 'Job Applications',
          value: 39,
          color: '#dddddd',
        },
        {
          source: 'Madrid',
          target: 'Job Applications',
          value: 35,
          color: '#dddddd',
        },
        {
          source: 'Amsterdam',
          target: 'Job Applications',
          value: 15,
          color: '#dddddd',
        },
        {
          source: 'Paris',
          target: 'Job Applications',
          value: 14,
          color: '#dddddd',
        },
        {
          source: 'London',
          target: 'Job Applications',
          value: 6,
          color: '#dddddd',
        },
        {
          source: 'Munich',
          target: 'Job Applications',
          value: 5,
          color: '#dddddd',
        },
        {
          source: 'Brussels',
          target: 'Job Applications',
          value: 4,
          color: '#dddddd',
        },
        {
          source: 'Dubai',
          target: 'Job Applications',
          value: 3,
          color: '#dddddd',
        },
        {
          source: 'Dublin',
          target: 'Job Applications',
          value: 3,
          color: '#dddddd',
        },
        {
          source: 'Other Cities',
          target: 'Job Applications',
          value: 12,
          color: '#dddddd',
        },
        {
          source: 'Job Applications',
          target: 'No Response',
          value: 189,
          color: '#dddddd',
        },
        {
          source: 'Job Applications',
          target: 'Responded',
          value: 49,
          color: 'orange',
        },
        {
          source: 'Responded',
          target: 'Rejected',
          value: 38,
          color: '#dddddd',
        },
        {
          source: 'Responded',
          target: 'Interviewed',
          value: 11,
          color: 'orange',
        },
        {
          source: 'Interviewed',
          target: 'No Offer',
          value: 8,
          color: '#dddddd',
        },
        {
          source: 'Interviewed',
          target: 'Declined Offer',
          value: 2,
          color: '#dddddd',
        },
        {
          source: 'Interviewed',
          target: 'Accepted Offer',
          value: 1,
          color: 'orange',
        },
      ],
      options: {
        order: [
          [
            ['Berlin', 'Barcelona', 'Madrid', 'Amsterdam', 'Paris', 'London'],
            ['Munich', 'Brussels', 'Dubai', 'Dublin', 'Other Cities'],
          ],
          [['Job Applications']],
          [['Responded'], ['No Response']],
          [['Interviewed'], ['Rejected']],
          [['Accepted Offer', 'Declined Offer', 'No Offer'], []],
        ],
      },
    };

    this.fontOptionsChart = {
      nodeWidth: 20,
      fontWeight: 500,
      fontSize: '10px',
      height: 300,
      fontColor: this.colorCodes[0],
      canvasStyle: '',
      nodeBorderColor: this.colorCodes[2],
      tooltipBGColor: this.colorCodes[1],
      tooltipBorderColor: this.colorCodes[2],
      fontFamily: 'Satisfy, "cursive"',
      nodeTemplate: (source: any, target: any, value: any) => {
        `<div class="flex items-center gap-2">
                            <div class="size-3" style='background-color:${source.color}'></div>
                            <h6 class="dark:text-dark-100">${source.title}</h6>
                            <div>=></div>
                            <div class="size-3" style='background-color:${target.color}'></div>
                            <h6 class="dark:text-dark-100">${target.title}</h6>
                            <div>: ${value}</div> 
                        </div>`;
      },
    };
  }

  renderSankey() {
    if (this.apexSankeyContainer.nativeElement) {
      this.apexSankeyContainer.nativeElement.innerHTML = '';
    }

    this.s = new ApexSankey(this.apexSankeyContainer.nativeElement, this.graphOptions);
    this.s.render(this.Data);
  }

  renderSecondSankey() {
    if (this.nodeCustomizationContainer.nativeElement) {
      this.nodeCustomizationContainer.nativeElement.innerHTML = '';
    }

    const secondSankey = new ApexSankey(this.nodeCustomizationContainer.nativeElement, this.graphOptionsForSecondChart);
    secondSankey.render(this.dataForSecondChart);
  }

  renderEdgeSankey() {
    if (this.edgeCustomizationContainer.nativeElement) {
      this.edgeCustomizationContainer.nativeElement.innerHTML = '';
    }

    const secondSankey = new ApexSankey(this.edgeCustomizationContainer.nativeElement, this.edgeOptionsChart);
    secondSankey.render(this.dataForEdgeChart);
  }

  renderFontSankey() {
    if (this.fontCustomizationContainer.nativeElement) {
      this.fontCustomizationContainer.nativeElement.innerHTML = '';
    }

    const secondSankey = new ApexSankey(this.fontCustomizationContainer.nativeElement, this.fontOptionsChart);
    secondSankey.render(this.dataForFontChart);
  }

  reloadSankey() {
    this.renderSankey();
    this.renderSecondSankey();
    this.renderEdgeSankey();
    this.renderFontSankey();
  }

}
