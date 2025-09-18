import { Component } from '@angular/core';
import { FinalOrderSummaryComponent } from '../final-order-summary/final-order-summary.component';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-apps-ecommerce-checkout',
    imports: [FinalOrderSummaryComponent, RouterModule, PageTitleComponent, CommonModule, LucideAngularModule, ReactiveFormsModule],
    templateUrl: './apps-ecommerce-checkout.component.html',
    styleUrl: './apps-ecommerce-checkout.component.scss'
})
export class AppsEcommerceCheckoutComponent {
  addressForm!: FormGroup;
  clickedIndex: null | number = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required]],
      alternatePhone: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      type: ['', Validators.required],
      selected: [true],
    });
  }

  loginUserAddress = [
    {
      "type": "Home",
      "firstName": "Jordan",
      "lastName": "Roughley",
      "phone": "(201) 518-4185",
      "address": "13833 Jayda Squares Apt. 849, Sharonville",
      "city": "Washington",
      "country": "USA",
      "zip": "33199 8539",
      "selected": false,
    },
    {
      "type": "Work",
      "firstName": "Prof. Ronaldo ",
      "lastName": "Funk",
      "phone": "(617) 941-9815",
      "address": "6602 Schroeder Ville Apt. 066",
      "city": "Bennytown",
      "country": "USA",
      "zip": "62144 1437",
      "selected": true
    }
  ]

  selectAdd(address: any) {
    this.loginUserAddress.forEach(element => {
      element.selected = false;
    });

    address.selected = true;
  }

  del(index:number) {
    this.loginUserAddress.splice(index,1)
  }

  addOrEditAddress(data: any, index: number) {
    this.clickedIndex = index;
    if (data) {
      this.addressForm.patchValue(data);
    }
  }

  onSubmit() {
    if (this.addressForm.valid) {
      if (this.clickedIndex !== null) {
        this.loginUserAddress[this.clickedIndex] = this.addressForm.value;
      } else {
        this.loginUserAddress.forEach(element => {
          element.selected = false;
        });
        this.loginUserAddress.unshift(this.addressForm.value); 
      }
      this.addressForm.reset();
      this.clickedIndex = null;
    } else {
      this.addressForm.markAsTouched()
      this.addressForm.markAllAsTouched();
      this.addressForm.updateValueAndValidity();
    }
  }

}
