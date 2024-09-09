import { Component, inject } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { CategoriseService } from '../../core/services/categorise.service';
import { IBrands } from '../../core/interfaces/ibrands';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  private readonly _BrandsService = inject(BrandService);

  brandsList: IBrands[] = [];

  getAllBrandsSub!: Subscription;

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandsList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
