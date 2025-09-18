import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  temperature: string;
  image: string;
  category: 'coffee' | 'burger' | 'pizza';
  customizations: {
    extraShot?: boolean;
    whippedCream?: boolean;
    caramelDrizzle?: boolean;
    extraCheese?: boolean;
    extraPatty?: boolean;
    bacon?: boolean;
    extraToppings?: boolean;
    glutenFree?: boolean;
  };
  instructions: string;
}

@Component({
  selector: 'app-apps-pos-user-shopping-cart',
  imports: [PageTitleComponent, CommonModule, FormsModule, LucideAngularModule, RouterLink],
  templateUrl: './apps-pos-user-shopping-cart.component.html',
  styleUrl: './apps-pos-user-shopping-cart.component.scss'
})
export class AppsPosUserShoppingCartComponent {
  items: CartItem[] = [
    {
      id: 1,
      name: 'Peppermint Mocha Holiday Cheer',
      price: 14.99,
      quantity: 1,
      size: 'Large',
      temperature: 'Hot',
      image: 'assets/images/pos/img-04.png',
      category: 'coffee',
      customizations: {
        extraShot: false,
        whippedCream: false,
        caramelDrizzle: false
      },
      instructions: ''
    },
    {
      id: 2,
      name: 'Caramel Macchiato Delight',
      price: 16.99,
      quantity: 1,
      size: 'Medium',
      temperature: 'Iced',
      image: 'assets/images/pos/img-16.png',
      category: 'coffee',
      customizations: {
        extraShot: false,
        whippedCream: false,
        caramelDrizzle: false
      },
      instructions: ''
    },
    {
      id: 3,
      name: 'Prosciutto Fig Balsamic Glaze',
      price: 33.99,
      quantity: 1,
      size: 'Large',
      temperature: 'Hot',
      image: 'assets/images/pos/img-14.png',
      category: 'coffee',
      customizations: {
        extraShot: false,
        whippedCream: false,
        caramelDrizzle: false
      },
      instructions: ''
    }
  ];

  discountCode: string = '';
  discountAmount: number = 0;
  taxRate: number = 0.056;

  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }

  get subtotal(): number {
    return this.items.reduce((sum, item) => {
      return sum + parseFloat(this.getItemSubtotal(item));
    }, 0);
  }

  get vat(): number {
    return this.subtotal * this.taxRate;
  }

  get total(): number {
    return this.subtotal + this.vat - this.discountAmount;
  }

  applyDiscount(): void {
    // Sample discount codes - you can customize this logic
    const discountCodes: { [key: string]: number } = {
      'SAVE10': 10,
      'SAVE20': 20,
      'WELCOME': 5,
      'STUDENT': 15
    };

    const code = this.discountCode.toUpperCase();
    if (discountCodes[code]) {
      this.discountAmount = discountCodes[code];
    } else {
      this.discountAmount = 0;
      // You can add error handling here
      alert('Invalid discount code');
    }
  }

  proceedToCheckout(): void {
    // Implement checkout logic
    console.log('Proceeding to checkout with total:', this.total);
    alert('Proceeding to checkout...');
  }

  updateCustomization(item: CartItem, customization: string): void {
    if (item.customizations.hasOwnProperty(customization)) {
      (item.customizations as any)[customization] = !(item.customizations as any)[customization];
    }
  }

  updateInstructions(item: CartItem, event: Event): void {
    const target = event.target as HTMLInputElement;
    item.instructions = target.value;
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      item.quantity = newQuantity;
    }
  }

  removeItem(itemId: number): void {
    this.items = this.items.filter(item => item.id !== itemId);
  }

  getItemSubtotal(item: CartItem): string {
    let subtotal = item.price;

    // Add customization costs
    if (item.customizations.extraShot) subtotal += 1.00;
    if (item.customizations.whippedCream) subtotal += 0.50;
    if (item.customizations.caramelDrizzle) subtotal += 0.50;
    if (item.customizations.extraCheese) {
      subtotal += item.category === 'pizza' ? 1.50 : 1.00;
    }
    if (item.customizations.extraPatty) subtotal += 2.00;
    if (item.customizations.bacon) subtotal += 1.50;
    if (item.customizations.extraToppings) subtotal += 2.00;
    if (item.customizations.glutenFree) subtotal += 2.00;

    return (subtotal * item.quantity).toFixed(2);
  }
}
