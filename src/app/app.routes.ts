import { Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { FinalConsumerBillCreateComponent } from './features/final-consumer-bill/CreateFinalConsumerBill/final-consumer-bill-create.component';
import { FinalConsumerBillListComponent } from './features/final-consumer-bill/ListFinalConsumerBill/final-consumer-bill-list.component';
import { AuthCallbackComponent } from './auth/auth-callback.component';
import { AuthAccountDeactivationBasicComponent } from './pages/Auth/auth-account-deactivation-basic/auth-account-deactivation-basic.component';
import { AuthAccountDeactivationCreativeComponent } from './pages/Auth/auth-account-deactivation-creative/auth-account-deactivation-creative.component';
import { AuthAccountDeactivationModernComponent } from './pages/Auth/auth-account-deactivation-modern/auth-account-deactivation-modern.component';
import { AuthForgotPasswordBasicComponent } from './pages/Auth/auth-forgot-password-basic/auth-forgot-password-basic.component';
import { AuthForgotPasswordCreativeComponent } from './pages/Auth/auth-forgot-password-creative/auth-forgot-password-creative.component';
import { AuthForgotPasswordModernComponent } from './pages/Auth/auth-forgot-password-modern/auth-forgot-password-modern.component';
import { AuthResetPasswordBasicComponent } from './pages/Auth/auth-reset-password-basic/auth-reset-password-basic.component';
import { AuthResetPasswordCreativeComponent } from './pages/Auth/auth-reset-password-creative/auth-reset-password-creative.component';
import { AuthResetPasswordModernComponent } from './pages/Auth/auth-reset-password-modern/auth-reset-password-modern.component';
import { AuthSigninBasicComponent } from './pages/Auth/auth-signin-basic/auth-signin-basic.component';
import { AuthSigninCreativeComponent } from './pages/Auth/auth-signin-creative/auth-signin-creative.component';
import { AuthSigninModernComponent } from './pages/Auth/auth-signin-modern/auth-signin-modern.component';
import { AuthSignupBasicComponent } from './pages/Auth/auth-signup-basic/auth-signup-basic.component';
import { AuthSignupCreativeComponent } from './pages/Auth/auth-signup-creative/auth-signup-creative.component';
import { AuthSignupModernComponent } from './pages/Auth/auth-signup-modern/auth-signup-modern.component';
import { AuthTwoStepVerificationCreativeComponent } from './pages/Auth/auth-two-step-verification-creative/auth-two-step-verification-creative.component';
import { AuthTwoStepVerificationModernComponent } from './pages/Auth/auth-two-step-verification-modern/auth-two-step-verification-modern.component';
import { AuthTwoStepVerificationBasicComponent } from './pages/Auth/auth-two-step-verification-basic/auth-two-step-verification-basic.component';
import { AuthSuccessfulPasswordBasicComponent } from './pages/Auth/auth-successful-password-basic/auth-successful-password-basic.component';
import { AuthSuccessfulPasswordCreativeComponent } from './pages/Auth/auth-successful-password-creative/auth-successful-password-creative.component';
import { AuthSuccessfulPasswordModernComponent } from './pages/Auth/auth-successful-password-modern/auth-successful-password-modern.component';
import { Pages500Component } from './pages/OtherPages/pages-500/pages-500.component';
import { Pages404Component } from './pages/OtherPages/pages-404/pages-404.component';
import { PagesMaintenanceComponent } from './pages/OtherPages/pages-maintenance/pages-maintenance.component';
import { PagesComingSoonComponent } from './pages/OtherPages/pages-coming-soon/pages-coming-soon.component';
import { PagesContactUsComponent } from './pages/OtherPages/pages-contact-us/pages-contact-us.component';
import { PagesContactUsFiveComponent } from './pages/OtherPages/pages-contact-us-five/pages-contact-us-five.component';
import { PagesContactUsFourComponent } from './pages/OtherPages/pages-contact-us-four/pages-contact-us-four.component';
import { PagesContactUsThreeComponent } from './pages/OtherPages/pages-contact-us-three/pages-contact-us-three.component';
import { PagesContactUsTwoComponent } from './pages/OtherPages/pages-contact-us-two/pages-contact-us-two.component';
import { AppsEmailTemplatesNewsletterComponent } from './pages/Apps/Email/Templates/apps-email-templates-newsletter/apps-email-templates-newsletter.component';
import { AppsEmailTemplatesWelcomeComponent } from './pages/Apps/Email/Templates/apps-email-templates-welcome/apps-email-templates-welcome.component';
import { LandingSchoolComponent } from './pages/landing/landing-school/landing-school.component';
import { LandingInvoiceComponent } from './pages/landing/landing-invoice/landing-invoice.component';
import { LandingDoctorsComponent } from './pages/landing/landing-doctors/landing-doctors.component';
import { LandingEcommerceComponent } from './pages/landing/landing-ecommerce/landing-ecommerce.component';
import { LandingEmailComponent } from './pages/landing/landing-email/landing-email.component';
import { AppsProjectsGridComponent } from './pages/Apps/projects/apps-projects-grid/apps-projects-grid.component';
import { AppsEcommerceProductsListComponent } from './pages/Apps/Ecommerce/Products/components/apps-ecommerce-products-list/apps-ecommerce-products-list.component';
import { AppsEcommerceCustomerUserComponent } from './pages/Apps/Ecommerce/Customers/apps-ecommerce-customer-user/apps-ecommerce-customer-user.component';
import { AgGridProductsListComponent } from './pages/Apps/Products/ag-grid-products-list/ag-grid-products-list.component';
import { AppsPosUserLoginComponent } from './pages/Apps/Pos/apps-pos-user-login/apps-pos-user-login.component';

export const routes: Routes = [
  // 🏠 Redirección por defecto a lista de facturas
  {
    path: '',
    redirectTo: '/final-consumer-bill/create',
    pathMatch: 'full'
  },

  // 🔐 RUTA DE CALLBACK DE AUTENTICACIÓN
  {
    path: 'auth/callback',
    component: AuthCallbackComponent,
    data: { title: 'Procesando Autenticación' }
  },

  // 💳 RUTAS DE FACTURACIÓN (sin guards - DevBadge maneja auth)
  {
    path: 'final-consumer-bill/create',
    loadComponent: () => import('./features/final-consumer-bill/CreateFinalConsumerBill/final-consumer-bill-create.component').then(m => m.FinalConsumerBillCreateComponent),
    data: { title: 'Crear Factura Consumidor Final' }
  },
  {
    path: 'final-consumer-bill/list',
    loadComponent: () => import('./features/final-consumer-bill/ListFinalConsumerBill/final-consumer-bill-list.component').then(m => m.FinalConsumerBillListComponent),
    data: { title: 'Lista de Facturas' }
  },
  {
    path: 'final-consumer-bill/search',
    loadComponent: () => import('./features/final-consumer-bill/SearchFinalConsumerBill/final-consumer-bill-search.component').then(m => m.FinalConsumerBillSearchComponent),
    data: { title: 'Buscar Factura' }
  },

  // 🔗 RUTAS DE ACCESO DIRECTO
  {
    path: 'factura',
    redirectTo: '/final-consumer-bill/create',
    pathMatch: 'full'
  },

  // 📄 RUTA DINÁMICA PARA VER FACTURA INDIVIDUAL (debe ir al final)
  {
    path: ':generationCode',
    loadComponent: () => import('./features/final-consumer-bill/ViewFinalConsumerBill/final-consumer-bill-view.component').then(m => m.FinalConsumerBillViewComponent),
    data: { title: 'Ver Factura' }
  },

  //RUTA PARA VER LOS DETALLES DE FACTURAS DESDE LA LISTA
  {
  path: 'final-consumer-bill/view/:generationCode',
  loadComponent: () => import('./features/final-consumer-bill/ViewFinalConsumerBill/final-consumer-bill-view.component').then(m => m.FinalConsumerBillViewComponent)
  },

  //Auth
  { path: 'auth-account-deactivation-basic', component: AuthAccountDeactivationBasicComponent, data: { title: 'AccountDeactivation' } },
  { path: 'auth-account-deactivation-creative', component: AuthAccountDeactivationCreativeComponent, data: { title: 'AccountDeactivation' } },
  { path: 'auth-account-deactivation-modern', component: AuthAccountDeactivationModernComponent, data: { title: 'AccountDeactivation' } },
  { path: 'auth-forgot-password-basic', component: AuthForgotPasswordBasicComponent, data: { title: 'ForgotPassword' } },
  { path: 'auth-forgot-password-creative', component: AuthForgotPasswordCreativeComponent, data: { title: 'ForgotPassword' } },
  { path: 'auth-forgot-password-modern', component: AuthForgotPasswordModernComponent, data: { title: 'ForgotPassword' } },
  { path: 'auth-reset-password-basic', component: AuthResetPasswordBasicComponent, data: { title: 'ResetPassword' } },
  { path: 'auth-reset-password-creative', component: AuthResetPasswordCreativeComponent, data: { title: 'ResetPassword' } },
  { path: 'auth-reset-password-modern', component: AuthResetPasswordModernComponent, data: { title: 'ResetPassword' } },
  { path: 'auth-signin-basic', component: AuthSigninBasicComponent, data: { title: 'signin' } },
  { path: 'auth-signin-creative', component: AuthSigninCreativeComponent, data: { title: 'signin' } },
  { path: 'auth-signin-modern', component: AuthSigninModernComponent, data: { title: 'signin' } },
  { path: 'auth-signup-basic', component: AuthSignupBasicComponent, data: { title: 'signup' } },
  { path: 'auth-signup-creative', component: AuthSignupCreativeComponent, data: { title: 'signup' } },
  { path: 'auth-signup-modern', component: AuthSignupModernComponent, data: { title: 'signup' } },
  { path: 'auth-two-step-verification-creative', component: AuthTwoStepVerificationCreativeComponent, data: { title: 'TwoStepVerification' } },
  { path: 'auth-two-step-verification-modern', component: AuthTwoStepVerificationModernComponent, data: { title: 'TwoStepVerification' } },
  { path: 'auth-two-step-verification-basic', component: AuthTwoStepVerificationBasicComponent, data: { title: 'TwoStepVerification' } },
  { path: 'auth-successful-password-basic', component: AuthSuccessfulPasswordBasicComponent, data: { title: 'SuccessfulPassword' } },
  { path: 'auth-successful-password-creative', component: AuthSuccessfulPasswordCreativeComponent, data: { title: 'SuccessfulPassword' } },
  { path: 'auth-successful-password-modern', component: AuthSuccessfulPasswordModernComponent, data: { title: 'SuccessfulPassword' } },

  //Other Pages
  { path: 'pages-contact-us', component: PagesContactUsComponent, data: { title: 'ContactUs' } },
  { path: 'pages-coming-soon', component: PagesComingSoonComponent, data: { title: 'comingSoon' } },
  { path: 'pages-maintenance', component: PagesMaintenanceComponent, data: { title: 'maintenance' } },
  { path: 'pages-404', component: Pages404Component, data: { title: '404' } },
  { path: 'pages-500', component: Pages500Component, data: { title: '500' } },
  { path: 'pages-contact-us-five', component: PagesContactUsFiveComponent, data: { title: 'ContactUs' } },
  { path: 'pages-contact-us-four', component: PagesContactUsFourComponent, data: { title: 'ContactUs' } },
  { path: 'pages-contact-us-three', component: PagesContactUsThreeComponent, data: { title: 'ContactUs' } },
  { path: 'pages-contact-us-two', component: PagesContactUsTwoComponent, data: { title: 'ContactUs' } },

  //email
  { path: 'apps-email-templates-newsletter', component: AppsEmailTemplatesNewsletterComponent, data: { title: 'NewsLetter' } },
  { path: 'apps-email-templates-welcome', component: AppsEmailTemplatesWelcomeComponent, data: { title: 'Welcome' } },

  //landing
  { path: 'landing-doctors', component: LandingDoctorsComponent, data: { title: 'doctors' } },
  { path: 'landing-ecommerce', component: LandingEcommerceComponent, data: { title: 'ecommerce' } },
  { path: 'landing-email', component: LandingEmailComponent, data: { title: 'email' } },
  { path: 'landing-invoice', component: LandingInvoiceComponent, data: { title: 'invoice' } },
  { path: 'landing-school', component: LandingSchoolComponent, data: { title: 'school' } },

  //project
  { path: 'apps-projects-grid', component: AppsProjectsGridComponent, data: { title: 'ProjectsGrid' } },

  // Ecommerce page
  { path: 'apps-ecommerce-products-list', component: AppsEcommerceProductsListComponent, data: { title: 'ProductsList' } },
  { path: 'ag-grid', component: AgGridProductsListComponent, data: { title: 'grid' } },
  { path: 'apps-ecommerce-customer-user', component: AppsEcommerceCustomerUserComponent, data: { title: 'CustomerUser' } },
  { path: 'apps-pos-user-login', component: AppsPosUserLoginComponent, data: { title: 'Pos User Login' } },

];
