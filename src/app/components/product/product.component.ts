import { Component, inject } from '@angular/core';
import { IProducts } from '../../core/interfaces/iproducts';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { CategoriseService } from '../../core/services/categorise.service';
import { CardService } from '../../core/services/card.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private readonly _ProductService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriseService);
  private readonly _CartService = inject(CardService);

  productsList: IProducts[] = [];
  categoriesList: ICategory[] = [];

  getAllProductSub!: Subscription;

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ProductService.getAllProduct().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productsList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe();
  }

  add(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
