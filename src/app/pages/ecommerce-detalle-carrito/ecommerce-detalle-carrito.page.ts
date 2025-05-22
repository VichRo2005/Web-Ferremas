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
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { StripePaymentElement } from '@stripe/stripe-js';


@Component({
  selector: 'app-ecommerce-detalle-carrito',
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './ecommerce-detalle-carrito.page.html',
  styleUrls: ['./ecommerce-detalle-carrito.page.scss'],
})
export class EcommerceDetalleCarritoPage implements OnInit {
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
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
  // Paso 1: Selección de tipo de despacho
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

          // Paso 2: Selección de tipo de comprobante
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

                  // ⚙️ Resumen del carrito y generación del PaymentIntent
                  const resumen = this.resumen;
                  const monto = resumen.total_final;

                  const response = await fetch(
                    'http://localhost:8000/api/stripe/create-payment-intent?monto=' + monto,
                    { method: 'POST' }
                  );
                  const { clientSecret } = await response.json();

                  this.stripe = await this.stripeService.getStripe();
                  this.elements = (this.stripe?.elements({ clientSecret }) || null);
                  const cardElement = this.elements?.create('payment');
                  cardElement?.mount('#card-element');

                  this.mostrarFormularioPago = true;
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


  async confirmarPago(event: Event) {
    event.preventDefault();

    if (!this.stripe || !this.elements) return;

    const { error, paymentIntent } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: 'http://localhost:8100/success', // opcional
      },
      redirect: 'if_required'
    });

    if (error) {
      alert("Error en el pago: " + error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      this.carritoService.procesarCompra({
        id_carrito: this.id_carrito,
        tipo_comprobante: this.tipoComprobante,
        tipo_despacho: this.tipoDespacho,
        pago_confirmado: true
      }).subscribe({
        next: res => {
          alert("Compra exitosa: Comprobante enviado a su correo");
          this.navigation.goTo('/catalogo');
        },
        error: err => {
          alert("Error al procesar la compra");
        }
      });
    }
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
