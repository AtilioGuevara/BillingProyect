import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LayoutSettingService } from './layouts/layout-setting.service';
import { addToCart, addToWishlist } from './pages/Apps/Ecommerce/Products/store/actions/product.actions';
import { Store } from '@ngrx/store';
import { LanguageService } from './Core/service/language.service';
import { TitleService } from './service/title.service';
import { filter } from 'rxjs';
import { SettingsModalComponent } from './layouts/navbar/modal/settings-modal/settings-modal.component';
import { ModalService } from './Core/service/modal/modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'domiex';

  userData = {
    name: 'Sophia Mia',
    image: 'assets/images/avatar/user-17.png',
  };
  constructor(private settingService: LayoutSettingService, private store: Store,
    private modalService: ModalService, private translateS: LanguageService, private router: Router,
    private titleService: TitleService,
    private activatedRoute: ActivatedRoute) {
    this.settingService.settings$.subscribe((settings) => {
      this.settingService.handleSettingsChange(settings);
    });
  }

  defaultAddToCartDatas = [
    {
      "productName": "Crop top Sweater Clothing",
      "category": "Fashion",
      "qty": 1,
      "discount": 10,
      "price": 29,
      "stock": 10,
      "image": "assets/images/products/img-04.png",
      "selectedSize": "L",
      "selectedColor": "sky",
      "color": [
        'sky', 'red', 'pink', 'purple', 'green'
      ],
      "size": [
        "L",
        "XL"
      ],
      "pId": "PEP-19118"
    },
    {
      "productName": "Spar Men Black Running Shoes",
      "category": "Footwear",
      "qty": 1,
      "discount": 10,
      "stock": 45,
      "price": 35,
      "image": "assets/images/products/img-03.png",
      "selectedSize": "2",
      "selectedColor": "sky",
      "color": [
        'sky', 'red'
      ],
      "size": [
        '2', '3', '4', '5'
      ],
      "pId": "PEP-19117"
    },
    {
      "productName": "Hoodie Jacket Letterman Sleeve Coat",
      "category": "Fashion",
      "qty": 1,
      "discount": 10,
      "stock": 45,
      "price": 44,
      "image": "assets/images/products/img-09.png",
      "selectedSize": "L",
      "selectedColor": "red",
      "color": [
        'sky', 'red', 'pink', 'purple', 'green'
      ],
      "size": [
        'L', 'XL', '2XL'
      ],
      "pId": "PEP-19123"
    }
  ]

  defaultWishListDatas = [
    {
      "productName": "Tote bag Leather Handbag Dolce",
      "category": "Bags",
      "qty": 1,
      "discount": 10,
      "price": 79,
      "stock": 45,
      "image": "assets/images/products/img-08.png",
      "selectedSize": "L",
      "selectedColor": "sky",
      "color": [
        "sky",
        "red"
      ],
      "size": [
        "L",
        "XL"
      ],
      "pId": "PEP-19122"
    },
    {
      "productName": "Hoodie Jacket Letterman Sleeve Coat",
      "category": "Fashion",
      "qty": 1,
      "discount": 10,
      "price": 44,
      "stock": 45,
      "image": "assets/images/products/img-09.png",
      "selectedSize": "L",
      "selectedColor": "red",
      "color": [
        'sky', 'red', 'pink', 'purple', 'green'
      ],
      "size": [
        'L', 'XL', '2XL'
      ],
      "pId": "PEP-19123"
    },
    {
      "productName": "Straw hat Cap Cowboy hat Sun hat",
      "category": "Accessories",
      "qty": 1,
      "discount": 10,
      "price": 24,
      "stock": 45,
      "image": "assets/images/products/img-10.png",
      "selectedSize": "L",
      "selectedColor": "sky",
      "color": [
        'sky', 'red', 'purple', 'blue', 'yellow'
      ],
      "size": [
        'L', 'XL', 'XS', '2XL'
      ],
      "pId": "PEP-19124"
    },
    {
      "productName": "Sneakers Shoe Nike Basketball",
      "category": "Footwear",
      "qty": 1,
      "discount": 10,
      "price": 32,
      "image": "assets/images/products/img-11.png",
      "selectedSize": "L",
      "selectedColor": "sky",
      "color": [
        'sky', 'red', 'yellow', 'pink'
      ],
      "size": [
        'S', 'L', 'XL'
      ],
      "pId": "PEP-19125"
    },
  ]

  ngOnInit() {
    this.addToCart();
    this.addToWishList();
    // this.modalService.open(SettingsModalComponent);
    this.translateS.setLanguage(this.translateS.getStoredSettings());
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setTitle();
    });
  }

  private setTitle() {
    let route = this.activatedRoute.root;

    // Traverse up the route tree to find route data (title)
    while (route.firstChild) {
      route = route.firstChild;
    }

    // Access the route data (title) and set it using TitleService
    if (route.snapshot.data['title']) {
      this.titleService.setTitle(route.snapshot.data['title']);
    }
  }

  addToCart() {
    this.defaultAddToCartDatas.forEach(pData => {
      this.store.dispatch(addToCart({ product: pData }));
    });
  }

  addToWishList() {
    this.defaultWishListDatas.forEach(wishlistData => {
      this.store.dispatch(addToWishlist({ product: wishlistData }));
    });
  }
}
