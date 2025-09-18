import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { NgSelectModule } from '@ng-select/ng-select';
import { LucideAngularModule } from 'lucide-angular';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addProduct, deleteProduct, updateProduct } from '../../store/actions/product.actions';
import { Products } from '../../interfaces/product.model';
import { Observable } from 'rxjs';
import * as ProductActions from '../../store/actions/product.actions'
import * as ProductSelectors from '../../store/selectors/product.selectors'
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-apps-ecommerce-create-products',
    imports: [PageTitleComponent, CommonModule, NgSelectModule, LucideAngularModule, FormsModule, ReactiveFormsModule],
    templateUrl: './apps-ecommerce-create-products.component.html',
    styleUrl: './apps-ecommerce-create-products.component.scss'
})
export class AppsEcommerceCreateProductsComponent  {
  products$!: Observable<Products[]>;
  currantSize!:string;
  currantColor!:string;


  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, private store: Store, private router: Router) {

    this.formGroup = this.fb.group({
      productName: new FormControl('', Validators.required),
      category: new FormControl(null, Validators.required),
      price: new FormControl('', Validators.required),
      // revenue: new FormControl(''),
      qty: new FormControl(1, Validators.required),
      image: new FormControl('',Validators.required),
      image1: new FormControl('',Validators.required),
      image2: new FormControl('',Validators.required),
      status: new FormControl(false),
      cashOnDelivery: new FormControl(false),
      visaAndMaster: new FormControl(false),
      bankTransfer: new FormControl(false),

      size: new FormControl([], Validators.required),
      colores: new FormControl([], Validators.required),
      brand: new FormControl(null, Validators.required),
      gender: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      stock: new FormControl(1, Validators.required),
      discount: new FormControl('', Validators.required),
      sellingPrice: new FormControl({ value: '', disabled: true }, Validators.required),
      productID: new FormControl(this.generateCustomID()),
    })
  }

  generateCustomID(): string {
    // Customize this function as needed
    const prefix = 'PEP-';
    const randomPart = Math.random().toString(36).substr(2, 9);
    return `${prefix}${randomPart.toUpperCase()}`;
  }

  ngOnInit() {
    register();
    this.productId = this.activatedRoute.snapshot.params['productId'];

    if (this.productId) {
      this.store.dispatch(ProductActions.loadProducts());

      this.products$ = this.store.select(ProductSelectors.selectAllProducts);

      this.products$.subscribe(data => {
        const editedData = data.find(product => product.productID === this.productId);
        if (editedData) {
          this.formGroup.patchValue(editedData);
        }
      });
    }


    this.formGroup.get('price')?.valueChanges.subscribe(() => this.calculateSellingPrice());
    this.formGroup.get('discount')?.valueChanges.subscribe(() => this.calculateSellingPrice());
  }

  ngAfterViewInit() {
    new Swiper(this.paginationDynamicSliderContainer.nativeElement, {
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
    });
  }

  formGroup!: FormGroup;
  productId!: any;
  @ViewChild('paginationDynamicSlider') paginationDynamicSliderContainer!: ElementRef;

  catOptions = [
    { label: "Fashion", value: "Fashion" },
    { label: "Fruits", value: "fruits" },
    { label: "Footwear", value: "Footwear" },
    { label: "Bags", value: "Bags" },
    { label: "Watch", value: "Watch" },
  ]

  brandOption = [
    { label: "Gucci", value: "Gucci" },
    { label: "Rolex", value: "Rolex" },
    { label: "Calvin Klein", value: "Calvin Klein" },
    { label: "Zara", value: "Zara" },
    { label: "Nike", value: "Nike" },
    { label: "Adidas", value: "Adidas" },
  ]

  sizeOptions = [
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "2XL", value: "2XL" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
  ]

  colorOptions = [
    { label: "blue", value: "blue" },
    { label: "green", value: "green" },
    { label: "yellow", value: "yellow" },
    { label: "sky", value: "sky" },
    { label: "red", value: "red" },
    { label: "pink", value: "pink" },
    { label: "gray", value: "gray" },
    { label: "purple", value: "purple" },
  ]

  selectedSizes: string[] = [];
  selectedBrand: string[] = [];

  // Select All option
  selectAllOption = { label: "Select All", value: "selectAll" };

  calculateSellingPrice() {
    const price = parseFloat(this.formGroup.get('price')?.value || '0');
    const discount = parseFloat(this.formGroup.get('discount')?.value || '0');

    if (isNaN(price) || isNaN(discount) || discount < 0 || discount > 100) {
      this.formGroup.get('sellingPrice')?.setValue('$00.00');
    } else {
      const sellingPrice = price * (1 - discount / 100);
      this.formGroup.get('sellingPrice')?.setValue('$' + sellingPrice.toFixed(2));
    }
  }

  onFileSelected(event: Event, imageType: string): void {
    const input = event.target as HTMLInputElement;
    let selectedFiles: { [key: string]: File } = { };

    if (input.files && input.files[0]) {
      const file = input.files[0];
      selectedFiles[imageType] = file;

      const reader = new FileReader();
      reader.onload = () => {
        if (imageType === 'image1') {
          this.formGroup.get('image1')?.setValue(reader.result as string);
        } else if (imageType === 'image2') {
          this.formGroup.get('image2')?.setValue(reader.result as string);
        } else if (imageType === 'image') {
          this.formGroup.get('image')?.setValue(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSelectionChange() {
    const allSelected = this.selectedSizes.includes(this.selectAllOption.value);

    if (allSelected) {
      // Select all options
      this.selectedSizes = this.sizeOptions.map(option => option.value);
    } else if (this.selectedSizes.length < this.sizeOptions.length) {
      // Remove Select All if not all items are selected
      this.selectedSizes = this.selectedSizes.filter(value => value !== this.selectAllOption.value);
    }
  }

  plusData(ctrl: string) {
    let control = this.formGroup.get(ctrl);
    if (control) {
      control.setValue(control.value + 1, { emitEvent: true });
    }
  }

  minusData(ctrl: string) {
    let control = this.formGroup.get(ctrl);
    if (control) {
      control.setValue(control.value - 1, { emitEvent: true });
    }
  }

  addOrEdit() {
    if (!this.formGroup.valid) {
      return
    }

    if (this.productId) {
      this.edit();
    } else {
      this.add();
    }
  }

  edit() {
    this.store.dispatch(updateProduct({ product: this.formGroup.getRawValue() }));
    this.router.navigate([`/apps-ecommerce-products-list/`]);
  }

  add() {
    this.store.dispatch(addProduct({ product: this.formGroup.getRawValue() }));
    this.router.navigate([`/apps-ecommerce-products-list/`]);
  }

  onDelete() {
    this.store.dispatch(deleteProduct({ productID: this.productId })); // Pass productID as an object
    this.router.navigate([`/apps-ecommerce-products-list/`]);
  }

}
