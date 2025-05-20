import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcommerceDetalleCarritoPage } from './ecommerce-detalle-carrito.page';

describe('EcommerceDetalleCarritoPage', () => {
  let component: EcommerceDetalleCarritoPage;
  let fixture: ComponentFixture<EcommerceDetalleCarritoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceDetalleCarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
