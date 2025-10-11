import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LayoutSettingService } from './layouts/layout-setting.service';
import { addToCart, addToWishlist } from './pages/Apps/Ecommerce/Products/store/actions/product.actions';
import { Store } from '@ngrx/store';
import { LanguageService } from './Core/service/language.service';
import { TitleService } from './service/title.service';
import { filter } from 'rxjs';
import { SettingsModalComponent } from './layouts/navbar/modal/settings-modal/settings-modal.component';
import { ModalService } from './Core/service/modal/modal.service';
import { DevBadge } from 'colibrihub-shared-components'; // HABILITADO
import { SessionService } from 'colibrihub-shared-services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getCookie } from './utils/cookie';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DevBadge], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'domiex';
  private isVerifyingToken = false; // Flag para evitar verificaciones concurrentes

  userData = {
    name: 'Sophia Mia',
    image: 'assets/images/avatar/user-17.png',
  };
  constructor(private settingService: LayoutSettingService, private store: Store,
    private modalService: ModalService, private translateS: LanguageService, private router: Router,
    private titleService: TitleService, private http: HttpClient,
    private activatedRoute: ActivatedRoute) {
    inject(SessionService);
    this.settingService.settings$.subscribe((settings) => {
      this.settingService.handleSettingsChange(settings);
    });

    // 🔍 Verificar token al inicializar la app
    this.verifyTokenOnStartup();
    
    // 🍪 Monitorear cookies para debug
    this.monitorCookies();
    
    // 📡 Monitorear peticiones de red para debug
    this.setupNetworkMonitoring();
    

  }

  /**
   * 🔍 Función para verificar el token y MANTENER EL ESTADO DE LOGIN
   */
  async verifyTokenOnStartup() {
    // Evitar ejecuciones concurrentes
    if (this.isVerifyingToken) {
      console.log('⏳ Verificación ya en progreso, saltando...');
      return;
    }
    
    this.isVerifyingToken = true;
    const token = getCookie('token');
    
    console.log('🔍 Verificando token y estado de autenticación...');
    
    if (!token) {
      console.warn('⚠️ No se encontró token - usuario debe loguearse');
      this.setAuthenticationState(false);
      this.isVerifyingToken = false; // Reset flag
      return;
    }

    console.log('🍪 Token encontrado:', token.substring(0, 20) + '...');

    try {
      // Crear headers con el token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // Usar el endpoint via proxy para verificar
      console.log('📡 Verificando token con backend de facturación via proxy...');
      console.log('🔍 Probando diferentes endpoints para encontrar el correcto...');
      
      // Probar endpoints reales del backend de facturación
      const testEndpoints = [
        '/bill/api/get/all',           // Endpoint principal que sabemos que existe
        '/bill/api/create/create',     // Endpoint de creación
      ];
      
      let validResponse = null;
      let validEndpoint = null;
      
      for (const endpoint of testEndpoints) {
        try {
          console.log(`🧪 Probando endpoint: ${endpoint}`);
          const response = await this.http.get(endpoint, { headers }).toPromise();
          console.log(`✅ Endpoint válido encontrado: ${endpoint}`, response);
          validResponse = response;
          validEndpoint = endpoint;
          break;
        } catch (endpointError: any) {
          console.log(`❌ ${endpoint} falló: ${endpointError.status} ${endpointError.statusText}`);
        }
      }
      
      // Si encontramos un endpoint válido, usar esa respuesta
      const response = validResponse;
      
      if (response && validEndpoint) {
        console.log('✅ TOKEN VÁLIDO - Manteniendo estado de autenticación');
        console.log('📋 Respuesta del backend:', response);
        console.log('🎯 Endpoint funcionando:', validEndpoint);
        
        // ✨ CLAVE: Establecer el estado de autenticación como válido
        this.setAuthenticationState(true);
      } else {
        console.log('⚠️ Token parece válido pero ningún endpoint de facturación disponible');
        console.log('🔄 Manteniendo token para reintentos posteriores');
        // No establecer estado negativo, solo mantener el token
      }
      
    } catch (error: any) {
      console.error('❌ Error durante verificación de token');
      console.error('🔍 Error details:', error);
      
      if (error.status === 401 || error.status === 403) {
        console.warn('🚫 Token expirado o inválido - limpiando estado');
        this.clearAuthenticationState();
      } else if (error.status === 404) {
        console.warn('⚠️ Endpoints no encontrados - pero token podría ser válido');
        console.warn('🔄 Manteniendo token, problema parece ser de configuración del servidor');
        // No limpiar el token si son errores 404
      } else if (error.status === 0) {
        console.warn('⚠️ Error de red - manteniendo token para reintentar');
        // No limpiar el token si es error de red
      } else {
        console.warn('🚫 Error inesperado - limpiando estado por seguridad');
        this.clearAuthenticationState();
      }
    } finally {
      // Siempre resetear el flag al terminar
      this.isVerifyingToken = false;
    }
  }

  /**
   * Establece estado de autenticación válido
   */
  private setAuthenticationState(isAuthenticated: boolean) {
    if (isAuthenticated) {
      console.log(' USUARIO AUTENTICADO - Estado mantenido después del refresh');
    } else {
      console.log(' Usuario no autenticado - se requiere login');
    }
  }

  /**
   * Limpia estado de autenticación inválido
   */
  private clearAuthenticationState() {
    console.log(' Limpiando estado de autenticación...');
    
    // Eliminar token de las cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    console.log('🔄 Token eliminado - usuario debe loguearse nuevamente');
  }

  /**
   * Monitoreo cookies para debug
   */
  private monitorCookies() {
    console.log('ESTADO ACTUAL DE COOKIES:');
    console.log('Todas las cookies:', document.cookie);
    
    // ANÁLISIS DETALLADO DE COOKIES
    const allCookies = document.cookie.split(';');
    console.log('Cookies individuales:');
    allCookies.forEach((cookie, index) => {
      const [name, value] = cookie.trim().split('=');
      console.log(`${index + 1}. "${name}" = "${value?.substring(0, 30)}${value?.length > 30 ? '...' : ''}"`);
    });
    
    // Verificar específicamente la cookie 'token'
    const token = getCookie('token');
    if (token) {
      console.log('Cookie token encontrada con getCookie():', token.substring(0, 30) + '...');
    } else {
      console.log('Cookie token NO encontrada con getCookie()');
      
      //  Debug adicional: buscar manualmente
      console.log(' Buscando token manualmente en document.cookie...');
      const manualSearch = document.cookie.includes('token');
      console.log('¿Contiene "token"?', manualSearch);
      
      if (manualSearch) {
        console.log('La cookie existe pero getCookie() no la encuentra');
        // Intentar extraer manualmente
        const match = document.cookie.match(/token=([^;]*)/);
        if (match) {
          console.log('Token extraído manualmente:', match[1].substring(0, 30) + '...');
          // Usar este token para verificar
          this.verifyTokenManually(match[1]);
        }
      }
    }
    
    // Monitorear cambios en las cookies cada 10 segundos
    let lastSeenToken = token; // Variable para evitar loops infinitos
    setInterval(() => {
      const currentToken = getCookie('token');
      if (currentToken && currentToken !== lastSeenToken) {
        console.log('¡NUEVA COOKIE TOKEN DETECTADA!');
        console.log('Nuevo token:', currentToken.substring(0, 30) + '...');
        lastSeenToken = currentToken; // Actualizar el token visto para evitar loop
        // Solo verificar si realmente es un token diferente
        if (currentToken !== token) {
          console.log('Token realmente diferente, verificando...');
          this.verifyTokenOnStartup();
        } else {
          console.log('Token igual al anterior, no verificando');
        }
      }
    }, 10000);
    
    console.log('Monitor de cookies iniciado - revisando cada 5 segundos');
  }

  /**
   * Configurar monitoreo de peticiones de red para debug
   */
  private setupNetworkMonitoring() {
    console.log('Configurando monitoreo de peticiones de red...');
    
    // Interceptar peticiones fetch (si DevBadge usa fetch)
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [url, options] = args;
      
      if (typeof url === 'string' && url.includes('/auth')) {
        console.log('PETICIÓN DE AUTH DETECTADA:', url);
        console.log('Opciones de petición:', options);
      }
      
      const response = await originalFetch(...args);
      
      if (typeof url === 'string' && url.includes('/auth')) {
        console.log('RESPUESTA DE AUTH:', response.status, response.statusText);
        
        if (response.ok && url.includes('login')) {
          console.log('LOGIN EXITOSO DETECTADO!');
          // Esperar un poco para que se guarde la cookie y luego verificar
          setTimeout(() => {
            console.log('Verificando token después del login...');
            this.verifyTokenOnStartup();
          }, 1000);
        }
      }
      
      return response;
    };
    
    console.log('Monitoreo de red configurado');
  }

  /**
   * 🎯 Verificar token extraído manualmente
   */
  async verifyTokenManually(token: string) {
    console.log('Verificando token extraído manualmente...');
    
    try {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      console.log('Enviando petición con token manual...');
      
      const response = await this.http.get('/api/bill/get/all', { headers }).toPromise();
      
      console.log('¡TOKEN MANUAL FUNCIONA! - Usuario autenticado');
      console.log('Respuesta:', response);
      
      this.setAuthenticationState(true);
      
    } catch (error: any) {
      console.error('❌ Token manual también falló:', error);
    }
  }

  /**
   *  Verificar token desde localStorage
   */
  async verifyTokenWithLocalStorage(token: string) {
    console.log('Verificando token desde localStorage...');
    
    try {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      const response = await this.http.get('/api/bill/get/all', { headers }).toPromise();
      
      console.log('¡TOKEN DE LOCALSTORAGE FUNCIONA! - Usuario autenticado');
      console.log('Respuesta:', response);
      
      this.setAuthenticationState(true);
      
    } catch (error: any) {
      console.error('Token de localStorage también falló:', error);
    }
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

  /**
   * 🧪 Probar login manual con endpoint correcto
   */
  async testManualLogin() {
    console.log('🧪 === PROBANDO LOGIN MANUAL (Ctrl+L) ===');
    
    try {
      const loginData = {
        username: 'dev',
        password: 'testpa$$'
      };
      
      // ✅ ENDPOINT CORREGIDO: El endpoint completo que usa DevBadge
      const loginUrl = `${environment.authApiUrl}${environment.authEndpoints.login}`;

      console.log('📤 Enviando petición de login a:', loginUrl);
      console.log('📋 Datos de login:', loginData);
      
      const response = await this.http.post(loginUrl, loginData, {
        observe: 'response',
        withCredentials: true
      }).toPromise();
      
      console.log('✅ RESPUESTA EXITOSA DEL LOGIN:');
      console.log('📊 Status:', response?.status);
      console.log('💾 Body:', response?.body);
      
      // 🍪 GUARDAR TOKEN MANUALMENTE EN COOKIES
      const responseBody = response?.body as any;
      if (responseBody?.token) {
        console.log('💾 Guardando token en cookies...');
        
        const token = responseBody.token;
        
        // 🔧 Debugger: Probar diferentes configuraciones de cookie
        console.log('🔧 Probando diferentes configuraciones de cookie...');
        
        // Configuración 1: Básica
        console.log('1️⃣ Intentando configuración básica...');
        document.cookie = `token=${token}`;
        console.log('📋 Cookies después de config básica:', document.cookie);
        
        // Configuración 2: Con path
        console.log('2️⃣ Intentando con path...');
        document.cookie = `token=${token}; path=/`;
        console.log('📋 Cookies después de config con path:', document.cookie);
        
        // Configuración 3: Sin max-age
        console.log('3️⃣ Intentando sin max-age...');
        document.cookie = `token=${token}; path=/; SameSite=Lax`;
        console.log('📋 Cookies después de config SameSite:', document.cookie);
        
        // Verificar si getCookie funciona
        const testToken = getCookie('token');
        console.log('🧪 Test getCookie:', testToken ? 'FUNCIONA' : 'NO FUNCIONA');
        
        // Probar localStorage como alternativa
        console.log('💾 Guardando también en localStorage como respaldo...');
        localStorage.setItem('token', token);
        console.log('📦 LocalStorage token:', localStorage.getItem('token')?.substring(0, 30) + '...');
        
        console.log('✅ Token procesado:', token.substring(0, 30) + '...');
      }
      
      // Verificar cookies después del login
      setTimeout(() => {
        console.log('🍪 VERIFICANDO COOKIES DESPUÉS DEL LOGIN:');
        console.log('📋 document.cookie:', document.cookie);
        
        const cookieToken = getCookie('token');
        const localStorageToken = localStorage.getItem('token');
        
        if (cookieToken) {
          console.log('✅ ¡TOKEN ENCONTRADO EN COOKIES!:', cookieToken.substring(0, 30) + '...');
          console.log('🚀 Verificando token con backend de facturación...');
          this.verifyTokenOnStartup();
        } else if (localStorageToken) {
          console.log('✅ ¡TOKEN ENCONTRADO EN LOCALSTORAGE!:', localStorageToken.substring(0, 30) + '...');
          console.log('🚀 Verificando token con backend de facturación...');
          this.verifyTokenWithLocalStorage(localStorageToken);
        } else {
          console.log('❌ No se encontró token en cookies ni localStorage');
          console.log('🔧 Debug: Revisemos qué hay en document.cookie...');
          console.log('📋 Raw document.cookie:', JSON.stringify(document.cookie));
        }
      }, 500);
      
    } catch (error: any) {
      console.error('❌ ERROR EN LOGIN MANUAL:');
      console.error('📊 Status:', error.status);
      console.error('📋 Error:', error.error);
      console.error('🔍 Detalles completos:', error);
    }
  }
}
