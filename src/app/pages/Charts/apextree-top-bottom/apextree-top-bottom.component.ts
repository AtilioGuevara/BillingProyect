import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ColorService } from '../../../service/color.service';
import ApexTree from 'apextree';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';

export interface TreeNode {
  id: string;
  data: {
    imageURL: string;
    name: string;
  };
  options: {
    nodeBGColor: string;
    nodeBGColorHover: string;
  };
  children?: TreeNode[];
}

@Component({
    selector: 'app-apextree-top-bottom',
    imports: [PageTitleComponent],
    templateUrl: './apextree-top-bottom.component.html',
    styleUrl: './apextree-top-bottom.component.scss'
})
export class ApextreeTopBottomComponent {

  @ViewChild('apexTreeContainer') apexTreeContainer!: ElementRef;
  colorCodes: string[] = [];
  treeData!: TreeNode;
  treeOptions: any;
  apexTree: any;

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.colorCodes = this.colorService.getColorCodes(['bg-gray-200', 'bg-white', 'bg-primary-500', 'bg-purple-500', 'bg-yellow-500', 'bg-gray-800', 'bg-orange-500', 'bg-green-500', 'bg-pink-500']); // Get color codes from service
    this.initializeTreeData();
  }

  ngAfterViewInit(): void {
    this.renderTree();

    window.addEventListener('resize', this.reloadTree.bind(this));
  }

  initializeTreeData(): void {
    this.treeData = {
      id: 'ms',
      data: {
        imageURL: 'assets/images/avatar/user-4.png',
        name: 'Jordan Davis',
      },
      options: {
        nodeBGColor: this.colorCodes[2],
        nodeBGColorHover: this.colorCodes[2],
      },
      children: [
        {
          id: 'mh',
          data: {
            imageURL: 'assets/images/avatar/user-11.png',
            name: 'Chris Wilson',
          },
          options: {
            nodeBGColor: this.colorCodes[3],
            nodeBGColorHover: this.colorCodes[3],
          },
          children: [
            {
              id: 'kb',
              data: {
                imageURL: 'assets/images/avatar/user-13.png',
                name: 'Alex Lee',
              },
              options: {
                nodeBGColor: this.colorCodes[4],
                nodeBGColorHover: this.colorCodes[4],
              },
            },
            {
              id: 'cr',
              data: {
                imageURL: 'assets/images/avatar/user-14.png',
                name: 'Taylor Wilson',
              },
              options: {
                nodeBGColor: this.colorCodes[5],
                nodeBGColorHover: this.colorCodes[5],
              },
            },
          ],
        },
        {
          id: 'cs',
          data: {
            imageURL: 'assets/images/avatar/user-15.png',
            name: 'Jane Brown',
          },
          options: {
            nodeBGColor: this.colorCodes[6],
            nodeBGColorHover: this.colorCodes[6],
          },
          children: [
            {
              id: 'Noah_Chandler',
              data: {
                imageURL: 'assets/images/avatar/user-16.png',
                name: 'John Garcia',
              },
              options: {
                nodeBGColor: this.colorCodes[7],
                nodeBGColorHover: this.colorCodes[7],
              },
            },
            {
              id: 'Felix_Wagner',
              data: {
                imageURL: 'assets/images/avatar/user-17.png',
                name: 'Cameron Wilson',
              },
              options: {
                nodeBGColor: this.colorCodes[8],
                nodeBGColorHover: this.colorCodes[8],
              },
            },
          ],
        },
      ],
    };

    this.treeOptions = {
      contentKey: 'data',
      width: '100%',
      height: 600,
      nodeWidth: 150,
      nodeHeight: 120,
      fontColor: this.colorCodes[1],
      borderColor: this.colorCodes[0],
      edgeColor: this.colorCodes[0],
      edgeColorHover: this.colorCodes[2],
      tooltipBorderColor: this.colorCodes[0],
      childrenSpacing: 50,
      siblingSpacing: 20,
      direction: 'top',
      nodeTemplate: (content: any) => `
        <div class="flex gap-5 justify-center flex-col items-center p-3">
          <img class="size-12 rounded-full" src='${content.imageURL}' alt='' />
          <h6>${content.name}</h6>
        </div>`,
      enableToolbar: true,
    };
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
