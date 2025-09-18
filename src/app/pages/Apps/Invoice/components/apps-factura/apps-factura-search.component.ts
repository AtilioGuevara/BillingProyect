import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FacturaService, Factura } from './factura.service';

@Component({
  selector: 'app-factura-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './apps-factura-search.component.html',
  styleUrls: ['./apps-factura-search.component.scss']
})
export class AppsFacturaSearchComponent {
  private fb = inject(FormBuilder);
  private facturaService = inject(FacturaService);

  form = this.fb.group({
    facturaId: ['', Validators.required]
  });
  factura: Factura | null = null;
  loading = false;

  buscar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.factura = null;
    this.facturaService.buscarFacturaPorId(this.form.value.facturaId ?? '').subscribe({
      next: (data: Factura) => {
        this.factura = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
