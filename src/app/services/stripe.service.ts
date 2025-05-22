// src/app/services/stripe.service.ts
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe('pk_test_51RRLA0E9GrPVUMzgFzbW3hUZNgEk69j3r0xSDOZuiK9eFf58TgNknlfn9keiYZWIHzLYqMjpYCyx8JUgHYkI2mTh007OzLTeFf'); // 🔑 Reemplaza por tu clave pública real
  }

  getStripe() {
    return this.stripePromise;
  }
}
