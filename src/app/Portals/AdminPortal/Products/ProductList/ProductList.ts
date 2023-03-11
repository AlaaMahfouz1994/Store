import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { HttpService } from '../../../../Common/Services/HttpService'
import { catchError, Observable, of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductAddEdit } from '../ProductAddEdit/ProductAddEdit';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
	standalone: true,
	templateUrl: './ProductList.html',
	styleUrls: ['./ProductList.scss'],
	imports: [FormsModule, CommonModule, MatButtonModule, ReactiveFormsModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatInputModule,
		TranslateModule,
		MatTableModule,
		MatDialogModule,
		MatPaginatorModule
	]
})

export class ProductList {

	displayedColumns: string[] = ['image', 'title', 'category', 'price', '1', '2'];
	AllRows: any[] = [];

	constructor(
		private HttpService: HttpService,
		public dialog: MatDialog,
	) { }

	ngOnInit() {
		this.GetProducts();
		this.GetCategories();
	}

	GetProducts() {
		const httpEndPoint = 'products';

		this.HttpService.Get<any[]>(httpEndPoint).pipe(
			catchError((error: any, caught: Observable<any>) => {
				let errMsg = error.message;
				alert(errMsg)
				return of();
			})).subscribe(
				{
					next: (response: any) => {
						this.AllRows = response;
						console.log(response);
					},
					error: errorResponse => {
						let errMsg = errorResponse.message;
						alert(errMsg)
					}
				})
	}

	GetCategories() {
		// const httpEndPoint = 'products/categories';

		// this.HttpService.Get<any[]>(httpEndPoint).pipe(
		// 	catchError((error: any, caught: Observable<any>) => {
		// 		let errMsg = error.message;
		// 		alert(errMsg)
		// 		return of();
		// 	})).subscribe(
		// 		{
		// 			next: (response: any) => {
		// 				console.log(response);
		// 			},
		// 			error: errorResponse => {
		// 				let errMsg = errorResponse.message;
		// 				alert(errMsg)
		// 			}
		// 		})
	}

	FilterRows() {
		this.AllRows = this.AllRows.filter((row: any) => {
			return row
		})
	}

	OpenProductAddEditPopup(row: any) {
		const toBeSavedRow = Object.assign({}, row);
		const dialogRef = this.dialog.open(ProductAddEdit, { width: '600px', data: toBeSavedRow });

		dialogRef.afterClosed().subscribe(result => {
			if (result && result.id) {
				if (row.id == null) {
					this.AllRows.push(result);
				} else {
					const index = this.AllRows.findIndex((obj: any) => obj.id == row.id);
					this.AllRows[index] = result;
				}
				this.FilterRows();
			}
			console.log(`Dialog result: ${result}`);
		});

	}

	Delete(row: any) {
		const httpEndPoint = 'products/' + row.id;
		this.HttpService.Delete<any>(httpEndPoint).pipe(
			catchError((error: any, caught: Observable<any>) => {
				let errMsg = error.message;
				alert(errMsg)
				return of();
			})).subscribe(
				{
					next: (response: any) => {
						const index = this.AllRows.findIndex((obj: any) => obj.id == row.id);
						this.AllRows.splice(index, 1);
						this.FilterRows();
					},
					error: errorResponse => {
						let errMsg = errorResponse.message;
						alert(errMsg)
					}
				})

	}

}