import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PpalBoegueroPage } from './ppal-boeguero.page';

describe('PpalBoegueroPage', () => {
  let component: PpalBoegueroPage;
  let fixture: ComponentFixture<PpalBoegueroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PpalBoegueroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
