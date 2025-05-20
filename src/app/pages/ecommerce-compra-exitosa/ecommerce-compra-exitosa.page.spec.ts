import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcommerceCompraExitosaPage } from './ecommerce-compra-exitosa.page';

describe('EcommerceCompraExitosaPage', () => {
  let component: EcommerceCompraExitosaPage;
  let fixture: ComponentFixture<EcommerceCompraExitosaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceCompraExitosaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
