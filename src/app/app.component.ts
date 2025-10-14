import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LayoutSettingService } from './layouts/layout-setting.service';
import { addToCart, addToWishlist } from './pages/Apps/Ecommerce/Products/store/actions/product.actions';
import { Store } from '@ngrx/store';
import { LanguageService } from './Core/service/language.service';
import { TitleService } from './service/title.service';
import { filter } from 'rxjs';
import { SettingsModalComponent } from './layouts/navbar/modal/settings-modal/settings-modal.component';
import { ModalService } from './Core/service/modal/modal.service';
import { DevBadge } from 'colibrihub-shared-components';
import { SessionService } from 'colibrihub-shared-services';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './features/final-consumer-bill/services/authentication-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DevBadge], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'domiex';

  userData = {
    name: 'Sophia Mia',
    image: 'assets/images/avatar/user-17.png',
  };
  
  constructor(
    private settingService: LayoutSettingService, 
    private store: Store,
    private modalService: ModalService, 
    private translateS: LanguageService, 
    private router: Router,
    private titleService: TitleService, 
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    inject(SessionService);
    this.settingService.settings$.subscribe((settings) => {
      this.settingService.handleSettingsChange(settings);
    });
  }

  ngOnInit() {
    // NO verificar autenticación automáticamente - el usuario usará el botón Login/Logout en navbar
    console.log('🎉 App iniciada - Login manual disponible en navbar');
    
    // Configurar datos de ejemplo
    this.addToCart();
    this.addToWishList();
    
    // Configurar idioma
    this.translateS.setLanguage(this.translateS.getStoredSettings());
    
    // Configurar títulos de página
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setTitle();
    });
  }

  /**
   * Verificar si el usuario está autenticado
   */
  private checkAuthentication() {
    const currentPath = window.location.pathname;
    
    console.log('🔍 App Component - Verificando autenticación para:', currentPath);
    
    // Verificar inmediatamente si ya hay token
    if (this.authService.isAuthenticated()) {
      console.log('✅ Usuario ya autenticado');
      return;
    }
    
    // Si estamos en la página de lista, podríamos venir del login externo
    // Dar tiempo para que se procesen las cookies del login externo
    if (currentPath.includes('/final-consumer-bill/list')) {
      console.log('� En página de lista - verificando si venimos del login externo');
      
      setTimeout(() => {
        if (!this.authService.isAuthenticated()) {
          console.log('❌ No se encontró autenticación - redirigiendo al login');
          if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            this.authService.redirectToLogin();
          }
        } else {
          console.log('✅ Autenticación encontrada después del delay');
        }
      }, 1500); // Dar tiempo para que se procesen las cookies
      return;
    }
    
    // Verificación normal para otras páginas
    console.log('🔒 Usuario no autenticado - redirigiendo al login');
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      this.authService.redirectToLogin();
    }
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

  // Datos de ejemplo para el carrito
  defaultAddToCartDatas = [
    {
      "productName": "Trendy Watch",
      "category": "Accessories",
      "qty": 1,
      "discount": 7,
      "price": 132.85,
      "stock": 10,
      "image": "assets/images/products/img-1.jpg",
      "selectedSize": "L",
      "selectedColor": "sky",
      "color": [
        'sky', 'red', 'pink', 'purple', 'green'
      ],
      "size": [
        "L",
        "XL"
      ],
      "pId": "PEP-19125"
    }
  ];

  // Datos de ejemplo para wishlist
  defaultWishListDatas = [
    {
      "productName": "Trendy Watch",
      "category": "Accessories",
      "qty": 1,
      "discount": 7,
      "price": 132.85,
      "stock": 10,
      "image": "assets/images/products/img-1.jpg",
      "selectedSize": "L",
      "selectedColor": "sky",
      "color": [
        'sky', 'red', 'pink', 'purple', 'green'
      ],
      "size": [
        "L",
        "XL"
      ],
      "pId": "PEP-19125"
    }
  ];

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
