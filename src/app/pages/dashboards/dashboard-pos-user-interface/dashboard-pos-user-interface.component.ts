import { Component } from '@angular/core';
import { PageTitleComponent } from "../../../layouts/page-title/page-title.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swiper from 'swiper';
import { LucideAngularModule } from 'lucide-angular';
import { OrderDetailComponent } from "./order-detail/order-detail.component";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  size: string | null;
  sugarLevel: string | null;
  price: number;
  total: number;
}

@Component({
  selector: 'app-dashboard-pos-user-interface',
  imports: [CommonModule, FormsModule, LucideAngularModule, OrderDetailComponent],
  templateUrl: './dashboard-pos-user-interface.component.html',
  styleUrl: './dashboard-pos-user-interface.component.scss'
})
export class DashboardPosUserInterfaceComponent {
  cartItems: CartItem[] = [];

  categories = [
    { id: 'burger', name: 'Burger', icon: 'assets/images/pos/vegetable.png', itemCount: 10 },
    { id: 'coffee', name: 'Coffee & Tea', icon: 'assets/images/pos/coffee.png', itemCount: 19 },
    { id: 'drink', name: 'Drinks', icon: 'assets/images/pos/beer.png', itemCount: 14 },
    { id: 'rice', name: 'Rice Dish', icon: 'assets/images/pos/rice-dish.png', itemCount: 26 },
    { id: 'pasta', name: 'Pasta', icon: 'assets/images/pos/noodles.png', itemCount: 8 },
    { id: 'pizza', name: 'Pizza', icon: 'assets/images/pos/pizza.png', itemCount: 33 },
    { id: 'salad', name: 'Salad', icon: 'assets/images/pos/greek-salad.png', itemCount: 11 },
  ];

  sizeClass = 'size-8 bg-gray-100 rounded-full cursor-pointer text-gray-700';
  activeSizeClass = 'size-8 bg-primary-500 text-white rounded-full';
  sugarClass = 'size-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-500';
  activeSugarClass = 'size-8 flex items-center justify-center rounded-md bg-primary-500 text-white';

  products = [
    {
      id: 1,
      category: 'coffee',
      name: 'Caramel Macchiato Dream Swirl',
      image: 'assets/images/pos/img-01.png',
      price: 11.99,
      available: 44,
      sold: 84,
      hasSize: true,
      hasSugarLevel: true
    },
    {
      id: 2,
      category: 'coffee',
      name: 'Coffee milk Latte Tea Cappuccino',
      image: 'assets/images/pos/img-02.png',
      price: 14.98,
      available: 48,
      sold: 27,
      hasSize: true,
      hasSugarLevel: true
    },
    {
      id: 3,
      category: 'coffee',
      name: 'Pumpkin Spice Autumn Classic',
      image: 'assets/images/pos/img-03.png',
      price: 4.99,
      available: 35,
      sold: 42,
      hasSize: true,
      hasSugarLevel: false
    },
    {
      id: 4,
      category: 'coffee',
      name: 'Peppermint Mocha Holiday Cheer',
      image: 'assets/images/pos/img-04.png',
      price: 12.99,
      available: 30,
      sold: 56,
      hasSize: true,
      hasSugarLevel: true
    },
    {
      id: 5,
      category: 'pizza',
      name: 'Garden Veggie Harvest Delight',
      image: 'assets/images/pos/img-05.png',
      price: 13.99,
      available: 25,
      sold: 38,
      hasSize: true,
      hasSugarLevel: false
    },
    {
      id: 6,
      category: 'burger',
      name: 'Triple Cheese Bacon Supreme',
      image: 'assets/images/pos/img-06.png',
      price: 15.99,
      available: 20,
      sold: 45,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 7,
      category: 'rice',
      name: 'Persian Jeweled Saffron Rice',
      image: 'assets/images/pos/img-07.png',
      price: 8.99,
      available: 40,
      sold: 32,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 8,
      category: 'rice',
      name: 'Wild Mushroom Truffle Rice',
      image: 'assets/images/pos/img-08.png',
      price: 10.99,
      available: 38,
      sold: 62,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 9,
      category: 'rice',
      name: 'Tropical Mango Coconut Rice',
      image: 'assets/images/pos/img-09.png',
      price: 3.99,
      available: 50,
      sold: 75,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 10,
      category: 'rice',
      name: 'Savory Beef Stroganoff Rice',
      image: 'assets/images/pos/img-10.png',
      price: 6.99,
      available: 28,
      sold: 48,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 11,
      category: 'rice',
      name: 'Smoky Chipotle Cilantro Rice',
      image: 'assets/images/pos/img-11.png',
      price: 9.99,
      available: 32,
      sold: 45,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 12,
      category: 'pasta',
      name: 'Spicy Arrabbiata Pepper Penne',
      image: 'assets/images/pos/img-12.png',
      price: 5.99,
      available: 42,
      sold: 58,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 13,
      category: 'pizza',
      name: 'Spinach Artichoke Alfredo Delight',
      image: 'assets/images/pos/img-13.png',
      price: 7.99,
      available: 15,
      sold: 35,
      hasSize: true,
      hasSugarLevel: false
    },
    {
      id: 14,
      category: 'pizza',
      name: 'Prosciutto Fig Balsamic Glaze',
      image: 'assets/images/pos/img-14.png',
      price: 11.99,
      available: 28,
      sold: 42,
      hasSize: true,
      hasSugarLevel: false
    },
    {
      id: 15,
      category: 'burger',
      name: 'Spicy Southwest Heat Wave',
      image: 'assets/images/pos/img-15.png',
      price: 14.99,
      available: 22,
      sold: 33,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 16,
      category: 'burger',
      name: 'Classic Americana Burger Dream',
      image: 'assets/images/pos/img-16.png',
      price: 16.99,
      available: 18,
      sold: 52,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 17,
      category: 'burger',
      name: 'Gourmet Truffle Umami Explosion',
      image: 'assets/images/pos/img-17.png',
      price: 9.99,
      available: 35,
      sold: 28,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 18,
      category: 'burger',
      name: 'Black Bean Southwest Fiesta',
      image: 'assets/images/pos/img-18.png',
      price: 13.99,
      available: 30,
      sold: 48,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 19,
      category: 'burger',
      name: 'Beyond Vegan Deluxe Supreme',
      image: 'assets/images/pos/img-19.png',
      price: 4.99,
      available: 45,
      sold: 65,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 20,
      category: 'drink',
      name: 'Classic Lime Mint Refresher',
      image: 'assets/images/pos/img-20.png',
      price: 7.99,
      available: 22,
      sold: 38,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 21,
      category: 'drink',
      name: 'Honey Ginger Spice Mojito',
      image: 'assets/images/pos/img-21.png',
      price: 7.99,
      available: 22,
      sold: 38,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 22,
      category: 'drink',
      name: 'Grapefruit Rosemary Citrus Fizz',
      image: 'assets/images/pos/img-22.png',
      price: 7.99,
      available: 22,
      sold: 38,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 23,
      category: 'drink',
      name: 'Elderflower Cucumber Mint Dream',
      image: 'assets/images/pos/img-23.png',
      price: 7.99,
      available: 22,
      sold: 38,
      hasSize: false,
      hasSugarLevel: false
    },
    {
      id: 24,
      category: 'burger',
      name: 'Seasoned Garlic Parmesan Fries',
      image: 'assets/images/pos/img-24.png',
      price: 7.99,
      available: 22,
      sold: 38,
      hasSize: true,
      hasSugarLevel: false
    }
  ];

  currentCategory = this.categories[0].id;
  selectedOptions: any = {};

  selectCategory(categoryId: string) {
    this.currentCategory = categoryId;
  }

  get filteredProducts() {
    return this.products.filter(product => product.category === this.currentCategory);
  }

  ngOnInit() {
    new Swiper('.mySwiper', {
      loop: false,
      slidesPerView: 6,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
    });
  }

  setOption(productId: number, key: 'size' | 'sugarLevel', value: string) {
    if (!this.selectedOptions[productId]) {
      this.selectedOptions[productId] = { quantity: 1 };
    }
    this.selectedOptions[productId][key] = value;
  }

  changeQty(productId: number, delta: number) {
    if (!this.selectedOptions[productId]) {
      this.selectedOptions[productId] = { quantity: 1 };
    }
    const qty = this.selectedOptions[productId].quantity + delta;
    this.selectedOptions[productId].quantity = Math.max(1, qty);
  }

  // Get current quantity for a product
  getCurrentQuantity(productId: number): number {
    return this.selectedOptions[productId]?.quantity || 1;
  }

  // Get total price for a product based on quantity
  getTotalPrice(product: any): number {
    const quantity = this.getCurrentQuantity(product.id);
    return product.price * quantity;
  }

  // Check if size is selected
  isSizeSelected(productId: number, size: string): boolean {
    return this.selectedOptions[productId]?.size === size;
  }

  // Check if sugar level is selected
  isSugarSelected(productId: number, sugar: string): boolean {
    return this.selectedOptions[productId]?.sugarLevel === sugar;
  }

  addToCart(product: any) {
    const options = this.selectedOptions[product.id] || { quantity: 1 };

    // Check if item with same product, size, and sugar level already exists
    const existingItemIndex = this.cartItems.findIndex(item =>
      item.name === product.name &&
      item.size === (options.size || null) &&
      item.sugarLevel === (options.sugarLevel || null)
    );

    if (existingItemIndex > -1) {
      // Update existing item
      this.cartItems[existingItemIndex].quantity += options.quantity;
      this.cartItems[existingItemIndex].total = this.cartItems[existingItemIndex].quantity * product.price;
    } else {
      // Add new item
      const newItem = {
        id: Date.now(), // Ensure uniqueness
        name: product.name,
        quantity: options.quantity,
        size: options.size || null,
        sugarLevel: options.sugarLevel || null,
        price: product.price,
        total: product.price * options.quantity
      };
      this.cartItems.push(newItem);
    }

    // Reset options for this product after adding to cart
    this.selectedOptions[product.id] = { quantity: 1 };

    // Show success message
    console.log('Item added to cart:', product.name);
  }
}