import { Injectable } from '@angular/core';

declare global {
  interface Window {
    billDebug: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DebugConsoleService {

  constructor() {
    this.initializeConsoleDebug();
  }

  private initializeConsoleDebug(): void {
    // Crear objeto global para debug
    window.billDebug = {
      
      /**
       * Crear cookie de autenticación
       * Uso: billDebug.setCookie('tu-jwt-token-aqui')
       */
      setCookie: (token: string) => {
        if (!token || token.trim() === '') {
          console.error('Error: Token vacío. Uso: billDebug.setCookie("tu-jwt-token")');
          return;
        }

        try {
          // Crear cookie que simule la del login
          const cookieString = `auth_token=${token.trim()}; domain=.beckysflorist.site; path=/; max-age=3600; samesite=None; secure`;
          document.cookie = cookieString;
          
          console.log('Cookie creada exitosamente!');
          console.log('Cookie:', cookieString);
          console.log('Para verificar usa: billDebug.testCookie()');
          
        } catch (error) {
          console.error('Error creando cookie:', error);
        }
      },

      /**
       * Verificar si la cookie existe
       * Uso: billDebug.testCookie()
       */
      testCookie: () => {
        const cookies = document.cookie;
        console.log(' Todas las cookies:', cookies);
        
        if (cookies.includes('auth_token=')) {
          const tokenMatch = cookies.match(/auth_token=([^;]+)/);
          const token = tokenMatch ? tokenMatch[1] : 'No encontrado';
          console.log('Cookie auth_token encontrada!');
          console.log('Token:', token.substring(0, 50) + '...');
          return true;
        } else {
          console.log('No se encontró cookie auth_token');
          console.log('Usa: billDebug.setCookie("tu-jwt-token") para crear una');
          return false;
        }
      },

      /**
       * Limpiar cookie de autenticación
       * Uso: billDebug.clearCookie()
       */
      clearCookie: () => {
        document.cookie = 'auth_token=; domain=.beckysflorist.site; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        console.log('Cookie eliminada');
        console.log('Usa billDebug.testCookie() para verificar');
      },

      /**
       * Ver todas las funciones disponibles
       * Uso: billDebug.help()
       */
      help: () => {
        console.log(`
 
        `);
      },

      /**
       * Ver contenido del localStorage
       * Uso: billDebug.showLocalStorage()
       */
      showLocalStorage: () => {
        console.log(' === LOCAL STORAGE ===');
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            const value = localStorage.getItem(key);
            console.log(` ${key}:`, value);
          }
        }
        
        if (localStorage.length === 0) {
          console.log('📭LocalStorage está vacío');
        }
      },

      /**
       * Limpiar todo (cookies + localStorage)
       * Uso: billDebug.clearAll()
       */
      clearAll: () => {
        // Limpiar cookies
        document.cookie = 'auth_token=; domain=.beckysflorist.site; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        
        // Limpiar localStorage  
        localStorage.clear();
        
        console.log(' Todo limpiado (cookies + localStorage)');
      }
    };

    // Mostrar mensaje de bienvenida en consola
    console.log(`
 === BILL DEBUG ACTIVADO ===

 Escribe "billDebug.help()" para ver todos los comandos disponibles.

 Comando rápido: billDebug.setCookie("tu-jwt-token")
    `);
  }
}