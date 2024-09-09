import { Component, inject } from '@angular/core';
import { ICategory } from '../../core/interfaces/icategory';
import { CategoriseService } from '../../core/services/categorise.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private readonly _CategoriesService = inject(CategoriseService);

  categoriesList: ICategory[] = [];

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
  }
}
