import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  _ActivatedRoute = inject(ActivatedRoute);
  _OrdersService = inject(OrdersService);
  cartid: any = '';
  orders: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  });
  checkOut() {
    this.orders.value;
    this._OrdersService.checkout(this.cartid, this.orders.value).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          window.open(res.session.url);
        }
      },
    });
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.cartid = p.get('id');
      },
    });
  }
}
