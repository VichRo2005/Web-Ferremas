//C:\Proyecto Integracion\ferremas\src\app\pages\ecommerce-detalle-carrito\ecommerce-detalle-carrito.page.ts
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { GestionaCarritoService } from 'src/app/services/gestiona-carrito.service';
import { StorageService } from 'src/app/services/storage.service';
import { DetalleCarrito } from 'src/app/services/gestiona-carrito.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { StripeService } from 'src/app/services/stripe.service';
import { loadStripe, Stripe, StripeElements, StripeCardElement} from '@stripe/stripe-js';



@Component({
  selector: 'app-ecommerce-detalle-carrito',
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './ecommerce-detalle-carrito.page.html',
  styleUrls: ['./ecommerce-detalle-carrito.page.scss'],
})
export class EcommerceDetalleCarritoPage implements OnInit {
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null; // ← para confirmar luego
  mostrarFormularioPago = false;
  tipoDespacho: number = 1;
  tipoComprobante: number = 1;


  id_carrito: any;

  carrito: DetalleCarrito[] = [];

  resumen: any = null;


  constructor(
    private storage: StorageService,
    private carritoService: GestionaCarritoService,
    private alertCtrl: AlertController,
    private navigation: NavigationService,
    private stripeService: StripeService
  ) { }

  async ngOnInit() {

  }

  async ionViewWillEnter() {
  this.id_carrito = await this.storage.get('id_carrito');
  this.obtenerCarrito();
  this.obtenerResumen(); // ✅ aquí agregamos la llamada al resumen
}

  obtenerCarrito() {
    this.carritoService.obtenerDetalleCarrito(this.id_carrito).subscribe({
      next: data => this.carrito = data,
      error: err => console.error(err)
    });
  }

  eliminarProducto(id_producto: number) {
    this.carritoService.eliminarProducto(this.id_carrito, id_producto).subscribe(() => {
      this.obtenerCarrito();
      this.obtenerResumen(); 
    });
  }

  async procesarCompra() {
  const monto = this.resumen.total_final;

  const response = await fetch(`http://localhost:8000/api/stripe/create-payment-intent?monto=${monto}`, {
    method: 'POST'
  });
  const { clientSecret } = await response.json();

  this.stripe = await this.stripeService.getStripe();
  this.elements = this.stripe?.elements({ clientSecret }) || null;

  this.mostrarFormularioPago = true;

  // 🔁 Espera que Angular renderice el div
  setTimeout(() => {
    const element = document.getElementById('card-element');
    if (this.elements && element) {
      this.cardElement = this.elements.create('card');
      this.cardElement.mount('#card-element');
    } else {
      alert('No se encontró el contenedor para Stripe.');
    }
  }, 100); // 100ms suele ser suficiente
}


  async confirmarPago(event: Event) {
  event.preventDefault();
  if (!this.stripe || !this.cardElement) return;

  // Pregunta primero tipo de despacho
  const despachoAlert = await this.alertCtrl.create({
    header: 'Tipo de Despacho',
    inputs: [
      { type: 'radio', label: 'Presencial', value: 1, checked: true },
      { type: 'radio', label: 'Flete / Envío', value: 2 }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Siguiente',
        handler: async (selectedDespacho: number) => {
          this.tipoDespacho = selectedDespacho;

          const comprobanteAlert = await this.alertCtrl.create({
            header: 'Tipo de Comprobante',
            inputs: [
              { type: 'radio', label: 'Boleta', value: 1, checked: true },
              { type: 'radio', label: 'Factura', value: 2 }
            ],
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel'
              },
              {
                text: 'Pagar',
                handler: async (selectedComprobante: number) => {
                  this.tipoComprobante = selectedComprobante;

                  // Confirmar pago
                  const { error, paymentIntent } = await this.stripe!.confirmCardPayment(
                    await this.obtenerClientSecret(), {
                      payment_method: {
                        card: this.cardElement!,
                        billing_details: { name: 'Cliente' }
                      }
                    }
                  );

                  if (error) {
                    alert("Error en el pago: " + error.message);
                  } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                    this.carritoService.procesarCompra({
                      id_carrito: this.id_carrito,
                      tipo_comprobante: this.tipoComprobante,
                      tipo_despacho: this.tipoDespacho,
                      pago_confirmado: true
                    }).subscribe({
                      next: () => {
                        alert("Compra exitosa: Comprobante enviado a su correo");
                        this.navigation.goTo('/catalogo');
                      },
                      error: () => {
                        alert("Error al procesar la compra");
                      }
                    });
                  }
                }
              }
            ]
          });

          await comprobanteAlert.present();
        }
      }
    ]
  });

  await despachoAlert.present();
}


  async obtenerClientSecret(): Promise<string> {
    const response = await fetch(`http://localhost:8000/api/stripe/create-payment-intent?monto=${this.resumen.total_final}`, {
      method: 'POST'
    });
    const data = await response.json();
    return data.clientSecret;
  }


  obtenerResumen() {
    this.carritoService.obtenerResumen(this.id_carrito).subscribe({
      next: data => this.resumen = data,
      error: err => console.error(err)
    });}

  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salir',
          handler: async () => {
            if (this.id_carrito) {
              await this.carritoService.desactivarCarrito(this.id_carrito).toPromise().catch(() => {});
            }
            await this.storage.clear();
            this.navigation.goTo('/login');
          }
        }
      ]
    });
    await alert.present();
  }


  volverAlCatalogo() {
    this.navigation.goTo('/catalogo');
  }

}
