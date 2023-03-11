import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../Common/Services/HttpService'
import { catchError, Observable, of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	standalone: true,
	templateUrl: './CategoryList.html',
	styleUrls: ['./CategoryList.scss'],
	imports: [FormsModule, CommonModule, MatToolbarModule, MatCardModule, MatGridListModule, MatIconModule, MatFormFieldModule, MatInputModule]

})
export class CategoryList {
	Categories: any[] = [];
	Products: any[] = [];
	FilteredRows: any[] = [];
	SelectedCategory: string = "electronics";
	constructor(
		private HttpService: HttpService,
	) { }

	ngOnInit() {
		this.GetCategories();
	}

	GetCategories() {
		const httpEndPoint = 'products/categories';

		this.HttpService.Get<any[]>(httpEndPoint).pipe(
			catchError((error: any, caught: Observable<any>) => {
				let errMsg = error.message;
				alert(errMsg)
				return of();
			})).subscribe(
				{
					next: (response: any) => {
						this.Categories = response;
						this.SelectedCategory = response[0];
						this.GetProductsInCategory(this.SelectedCategory);

					},
					error: errorResponse => {
						let errMsg = errorResponse.message;
						alert(errMsg)
					}
				})
	}


	GetProductsInCategory(category: string) {
		const httpEndPoint = 'products/category/' + category;

		this.HttpService.Get<any[]>(httpEndPoint).pipe(
			catchError((error: any, caught: Observable<any>) => {
				let errMsg = error.message;
				alert(errMsg)
				return of();
			})).subscribe(
				{
					next: (response: any) => {
						this.SelectedCategory = category;
						this.Products = response;
						this.FilteredRows = response;
					},
					error: errorResponse => {
						let errMsg = errorResponse.message;
						alert(errMsg)
					}
				})
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;

		this.FilteredRows = this.Products.filter((row: any) => {
			return (
				(!filterValue) ||
				(row.title && row.title.toLowerCase().indexOf(filterValue.trim().toLowerCase()) > -1) ||
				(row.description && row.description.toLowerCase().indexOf(filterValue.trim().toLowerCase()) > -1)
			)
		});

	}

}
