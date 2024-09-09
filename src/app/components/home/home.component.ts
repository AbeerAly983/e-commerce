import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { CategoriseService } from '../../core/services/categorise.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CardService } from '../../core/services/card.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriseService = inject(CategoriseService);
  private readonly _CardService = inject(CardService);
  productSubscribe!: Subscription;
  categorySubscribe!: Subscription;
  productList: IProducts[] = [];
  allCategories: ICategory[] = [];

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  customCate: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      500: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.productSubscribe = this._ProductsService.getAllProduct().subscribe({
      next: (res) => {
        this.productList = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.categorySubscribe = this._CategoriseService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          this.allCategories = res.data;
        },
        error: () => {},
      });
  }
  ngOnDestroy(): void {
    this.productSubscribe?.unsubscribe();
    this.categorySubscribe?.unsubscribe();
  }
  addToCart(id: string) {
    this._CardService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {},
    });
  }
}
