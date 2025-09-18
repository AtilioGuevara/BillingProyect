import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import ApexTree from 'apextree';
import { ColorService } from '../../../service/color.service';
import { TreeNode } from '../apextree-top-bottom/apextree-top-bottom.component';

@Component({
    selector: 'app-apextree-bottom-top',
    imports: [PageTitleComponent],
    templateUrl: './apextree-bottom-top.component.html',
    styleUrl: './apextree-bottom-top.component.scss'
})
export class ApextreeBottomTopComponent {
  @ViewChild('apexTreeContainer') apexTreeContainer!: ElementRef;
  colorCodes: string[] = [];
  treeData!: any;
  treeOptions: any;
  apexTree: any;

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.colorCodes = this.colorService.getColorCodes(['bg-gray-200', 'bg-gray-500', 'bg-white', 'bg-primary-500', 'bg-purple-500', 'bg-yellow-500', 'bg-gray-800', 'bg-orange-500', 'bg-green-500', 'bg-pink-500']);
    this.initializeTreeData();
  }

  ngAfterViewInit(): void {
    this.renderTree();

    window.addEventListener('resize', this.reloadTree.bind(this));
  }

  initializeTreeData(): void {
    this.treeData = {
      id: 'Lucas_Alex',
      data: {
        name: 'Ezekiel Halvorson',
        imageURL: 'assets/images/avatar/user-18.png',
        borderColor: this.colorCodes[3],
      },
      children: [
        {
          id: 'Alex_Lee',
          data: {
            name: 'Erin Dicki',
            imageURL: 'assets/images/avatar/user-19.png',
            borderColor: this.colorCodes[4],
          },

          children: [
            {
              id: 'Mia_Patel',
              data: {
                name: 'Norval Murray',
                imageURL: 'assets/images/avatar/user-20.png',
                borderColor: this.colorCodes[5],
              },
            },
            {
              id: 'Ryan_Clark',
              data: {
                name: 'Oliver Boehm',
                imageURL: 'assets/images/avatar/user-21.png',
                borderColor: this.colorCodes[5],
              },
            },
            {
              id: 'Zoe_Wang',
              data: {
                name: 'Gino Prosacco',
                imageURL: 'assets/images/avatar/user-22.png',
                borderColor: this.colorCodes[5],
              },
            },
          ],
        },
        {
          id: 'Leo_Kim',
          data: {
            name: 'Edgardo Kessler',
            imageURL: 'assets/images/avatar/user-23.png',
            borderColor: this.colorCodes[6],
          },

          children: [
            {
              id: 'Ava_Jones',
              data: {
                name: 'Marcos Stracke',
                imageURL: 'assets/images/avatar/user-24.png',
                borderColor: this.colorCodes[7],
              },
            },
            {
              id: 'Maya_Gupta',
              data: {
                name: 'Waylon Erdman',
                imageURL: 'assets/images/avatar/user-25.png',
                borderColor: this.colorCodes[7],
              },
            },
          ],
        },

        {
          id: 'Max_Ruiz',
          data: {
            name: 'Eleanora Hayes',
            imageURL: 'assets/images/avatar/user-26.png',
            borderColor: this.colorCodes[6],
          },
        },
      ],
    };

    this.treeOptions = {
      contentKey: 'data',
      width: '100%',
      height: 600,
      nodeWidth: 150,
      nodeHeight: 70,
      childrenSpacing: 70,
      fontSize: '12px',
      siblingSpacing: 30,
      direction: 'bottom',
      nodeBGColor: this.colorCodes[2],
      nodeBGColorHover: this.colorCodes[2],
      fontColor: this.colorCodes[1],
      borderColor: this.colorCodes[0],
      edgeColor: this.colorCodes[0],
      edgeColorHover: this.colorCodes[2],
      tooltipBorderColor: this.colorCodes[0],
      nodeTemplate: (content: { imageURL: any; name: any; borderColor: any; }) => {
        return `<div class="flex flex-col h-full"><div class="flex gap-2 items-center h-full rounded-t-md shadow-lg px-4">
                        <img class="size-8 rounded-full" src='${content.imageURL}' alt=''>
                        <h6 class="text-xs text-gray-500 dark:text-dark-500">${content.name}</h6>
                       </div><div class="mt-auto rounded-b" style='border-bottom: 10px solid ${content.borderColor}'></div></div>`;
      },
      enableToolbar: true,
    }
  }

  renderTree(): void {
    if (this.apexTreeContainer) {
      this.apexTreeContainer.nativeElement.innerHTML = '';
    }

    this.apexTree = new ApexTree(this.apexTreeContainer.nativeElement, this.treeOptions);
    this.apexTree.render(this.treeData);
  }

  reloadTree(): void {
    this.renderTree();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.reloadTree();
  }
}
