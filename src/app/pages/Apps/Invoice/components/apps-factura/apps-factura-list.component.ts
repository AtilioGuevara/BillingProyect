import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaService, Factura } from './factura.service';

@Component({
  selector: 'app-factura-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apps-factura-list.component.html',
  styleUrls: ['./apps-factura-list.component.scss']
})
export class AppsFacturaListComponent implements OnInit {
  facturas: Factura[] = [];
  loading = false;

  constructor(private facturaService: FacturaService) {}

  ngOnInit() {
    this.loading = true;
    this.facturaService.listarFacturas().subscribe({
      next: (data: Factura[]) => {
        this.facturas = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
