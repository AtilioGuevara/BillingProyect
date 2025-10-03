import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FinalConsumerBillDetailDTO } from '../../../dtos/final-consumer-bill.dto';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { FinalConsumerBillNavComponent } from '../../NavComponents/final-consumer-bill-nav.component';

@Component({
  selector: 'app-final-consumer-bill-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FinalConsumerBillNavComponent],
  templateUrl: './final-consumer-bill-search.component.html',
  styleUrls: ['./final-consumer-bill-search.component.scss']
})
export class FinalConsumerBillSearchComponent {
  searchForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder, 
    private billService: FinalConsumerBillService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      generationCode: [''] // Quitamos validaciones temporalmente para debugging
    });
  }

  search(): void {
    const generationCode = this.searchForm.get('generationCode')?.value?.trim();
    
    if (generationCode) {
      this.loading = true;
      this.errorMsg = '';
      
      console.log('🔍 Navegando a factura con código:', generationCode);
      console.log('🚀 Usando Angular Router para preservar estado de autenticación');
      
      // Usar Angular Router para navegar sin recargar la página
      // Esto preserva el token de autenticación y el estado de la aplicación
      this.router.navigate([generationCode]).then(success => {
        if (success) {
          console.log('✅ Navegación exitosa a factura:', generationCode);
        } else {
          console.error('❌ Error en navegación');
          this.errorMsg = 'Error al navegar a la factura';
        }
        this.loading = false;
      }).catch(error => {
        console.error('❌ Error en navegación:', error);
        this.errorMsg = 'Error al navegar a la factura';
        this.loading = false;
      });
      
    } else {
      this.errorMsg = 'Por favor ingrese un código de generación válido';
      console.warn('⚠️ Código de generación vacío');
    }
  }

  clearSearch(): void {
    this.searchForm.reset();
    this.errorMsg = '';
    this.loading = false;
  }
}