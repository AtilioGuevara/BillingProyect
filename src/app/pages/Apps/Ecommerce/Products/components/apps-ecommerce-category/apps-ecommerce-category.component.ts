import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { ColDefs, DomixGridTestComponent } from '../../../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../../../componate/domix-grid-test/service/domix-table.service';
import { RestApiService } from '../../../../../../Core/service/rest-api.service';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../../../module/domix dropdown/domix-dropdown.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomixPaginationComponent } from '../../../../../../componate/domix-pagination/domix-pagination.component';
import { CatAddEditComponent } from './cat-add-edit/cat-add-edit.component';
import { ImageUplodingService } from '../../../../../../service/image-uploding.service';
import { generateRandomId } from '../../../../../../Core/shared functions/shared-functions-varibles';

export interface CategoryList {
  category: string,
  products: number,
  image: string,
  status: boolean,
  description: string,
  productID: string,
  checked:boolean,
}

@Component({
    selector: 'app-apps-ecommerce-category',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule, ReactiveFormsModule, DomixDropdownModule, FormsModule, DomixPaginationComponent],
    templateUrl: './apps-ecommerce-category.component.html',
    styleUrl: './apps-ecommerce-category.component.scss'
})
export class AppsEcommerceCategoryComponent extends DomixGridTestComponent {
  hasHeaderCheckbox=false;

  constructor(public superSer: DomixTableService, private apiService: RestApiService, public fb: FormBuilder, public imgUploading: ImageUplodingService) {
    super(superSer)

    this.hasHeaderCheckbox = this.defs.some((col) => col.headerCheckbox);
  }
  editIndex!: number | null;
  formGroup!: FormGroup;
  imageUrl: string | null = '';


  defs: ColDefs[] = [
    {
      headerName: 'Category ID',
      field: 'productID',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Category Name',
      field: 'category',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Products',
      field: 'products',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Action',
      sortable: false,
    }
  ]

  ngOnInit() {
    this.getCatData()

    this.formGroup = this.fb.group({
      category: ['', Validators.required],
      products: [1, [Validators.required]],
      image: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      productID: [generateRandomId()]
    });
  }

  getCatData() {
    this.apiService.getCatList().subscribe(cat => {
      this.gridData = cat;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    })
  }

  addEditCat(data: any, index: any) {
    const formValue = { ...data };
    this.imageUrl = formValue.image;
    delete formValue.image;
    this.formGroup.patchValue(formValue);
    this.editIndex = index;
  }

  onFileChange(event: any, fileInput: HTMLInputElement) {

    if (event.target.files && event.target.files[0]) {
      this.imgUploading.uploadFile(event).subscribe({
        next: (result) => {
          this.imageUrl = result as string; 

          this.formGroup.get('image')?.setValue(result);
        },
      });

      // Reset the input value to allow selecting the same file again
      fileInput.value = ''; // This resets the file input
    }
  }

  addOrEditedData() {
    if (!this.imageUrl) {
      return
    }
    const formValue = { ...this.formGroup.value,image:this.imageUrl};
    
    if (this.editIndex != null && this.editIndex > -1) {
      this.gridData[this.editIndex] = {
        ...this.gridData[this.editIndex],
        ...formValue
      };
    }else {
      this.gridData.unshift(formValue)
    }
    this.displayedData = [...this.gridData];
    this.updateDisplayedData();
    this.reset()
  }

  del(index:number) {
    this.gridData.splice(index, 1);
    this.displayedData = [...this.gridData];
    this.updateDisplayedData();
  }

  reset() {
    this.editIndex = null;
    this.imageUrl = null

    this.formGroup.reset({
      category: '',
      products: 1,
      image: '',
      status: '', // or a default value like `true` or `false` if needed
      description: '',
      productID: generateRandomId() // Regenerate a new product ID on reset
    });
  }
}
