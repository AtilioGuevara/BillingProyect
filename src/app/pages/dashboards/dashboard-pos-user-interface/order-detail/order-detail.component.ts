import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LucideAngularModule } from 'lucide-angular';
import { FlatpickrModule } from '../../../../module/flatpickr/flatpickr.module';
interface CartItem {
  id: number;
  name: string;
  quantity: number;
  size: string | null;
  sugarLevel: string | null;
  price: number;
  total: number;
}

interface CustomerInfo {
  notes: string;
}
@Component({
  selector: 'app-order-detail',
  imports: [CommonModule, FormsModule, NgSelectModule, LucideAngularModule, FlatpickrModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() openTab: number = 1;
  activeLink = 'card';
  timePickerOptions = { enableTime: true, noCalendar: true, dateFormat: 'H:i' };
  activeClasses = 'bg-gray-100 text-gray-800 dark:bg-dark-850 dark:text-dark-50';
  inactiveClasses = 'hover:text-primary-500';

  TableData = [
    { label: 'A1', value: 'A1' },
    { label: 'A2', value: 'A2 ' },
    { label: 'A3', value: 'A3' },
    { label: 'B1', value: 'B1' },
    { label: 'B2', value: 'B2' },
    { label: 'B3', value: 'B3' },
    { label: 'C1', value: 'C1' },
    { label: 'C2', value: 'C2' },
    { label: 'C3', value: 'C3' },
    { label: 'D1', value: 'D1' },
    { label: 'D2', value: 'D2' },
    { label: 'D3', value: 'D3' },
  ];

  customerInfo: CustomerInfo = {
    notes: ''
  };

  orderType = 'dinein';


  trackByCartItem(index: number, item: CartItem): number {
    return item.id;
  }

  clearCart() {
    this.cartItems.length = 0;
  }

  removeFromCart(itemId: number) {
    const index = this.cartItems.findIndex(item => item.id === itemId);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Please add items to cart before placing order');
      return;
    }

    const orderData = {
      items: this.cartItems,
      customerInfo: this.customerInfo,
      paymentMethod: this.activeLink,
      totals: {
        subtotal: this.cartTotal,
        tax: this.tax,
        total: this.grandTotal
      }
    };

    console.log('Order placed:', orderData);
    alert('Order placed successfully!');

    // Clear cart after successful order
    this.clearCart();
    this.customerInfo.notes = '';
  }

  get cartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.total, 0);
  }

  get tax(): number {
    return this.cartTotal * 0.056; // 5.6% tax
  }

  get grandTotal(): number {
    const deliveryFee = this.openTab === 3 ? 3.50 : 0;
    return this.cartTotal + this.tax + deliveryFee;
  }
  
  setTab(tab: number) {
    this.openTab = tab;
  }

  isActive(tab: number): boolean {
    return this.openTab === tab;
  }

}
