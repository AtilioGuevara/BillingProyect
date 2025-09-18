import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FacturaService, Factura } from './factura.service';

@Component({
  selector: 'app-factura-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './apps-factura-create.component.html',
  styleUrls: ['./apps-factura-create.component.scss']
})
export class AppsFacturaCreateComponent {
  private fb = inject(FormBuilder);
  private facturaService = inject(FacturaService);

  form = this.fb.group({
    companyName: ['', [Validators.required, Validators.minLength(2)]],
    companyNIT: ['', [Validators.required, Validators.minLength(8)]],
    companyAddress: ['', [Validators.required, Validators.minLength(10)]],
    companyPhone: ['', [Validators.required, Validators.minLength(8)]],
    companyEmail: ['', [Validators.required, Validators.email]],
    clientName: ['', [Validators.required, Validators.minLength(2)]],
    clientDUI: ['', [Validators.required, Validators.minLength(9)]],
    clientPhone: [0, [Validators.required, Validators.min(10000000)]],
    clientEmail: ['', [Validators.required, Validators.email]],
    date: ['', Validators.required]
  });

  loading = false;
  mensaje = '';

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.mensaje = '';
    const payload: Omit<Factura, 'id'> = {
      companyName: this.form.value.companyName ?? '',
      companyNIT: this.form.value.companyNIT ?? '',
      companyAddress: this.form.value.companyAddress ?? '',
      companyPhone: this.form.value.companyPhone ?? '',
      companyEmail: this.form.value.companyEmail ?? '',
      clientName: this.form.value.clientName ?? '',
      clientDUI: this.form.value.clientDUI ?? '',
      clientPhone: this.form.value.clientPhone ?? 0,
      clientEmail: this.form.value.clientEmail ?? '',
      date: this.form.value.date ?? ''
    };
    this.facturaService.crearFactura(payload).subscribe({
      next: (res: Factura) => {
        this.mensaje = `Factura creada exitosamente (ID: ${res.id ?? '—'})`;
        this.form.reset({ clientPhone: 0, date: '' });
        this.loading = false;
      },
      error: (err) => {
        this.mensaje = 'Error al crear la factura';
        this.loading = false;
      }
    });
  }
}
