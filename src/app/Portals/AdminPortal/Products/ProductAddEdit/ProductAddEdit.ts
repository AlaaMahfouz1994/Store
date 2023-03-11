import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpService } from '../../../../Common/Services/HttpService'
import { catchError, Observable, of } from 'rxjs';

@Component({
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './ProductAddEdit.html',
    styleUrls: ['./ProductAddEdit.scss'],
    imports: [FormsModule, CommonModule, MatButtonModule, ReactiveFormsModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        TranslateModule,
        MatDialogModule,
        MatGridListModule
    ]

})

export class ProductAddEdit {

    ProductRow: any = { title: '', category: '' };

    constructor(
        @Inject(MAT_DIALOG_DATA) public Data: any,
        private HttpService: HttpService,
        private DialogRef: MatDialogRef<ProductAddEdit>,
    ) { }

    ngOnInit() {
        console.log(this.Data);

    }

    Save() {
        if (this.Data.id == null) {
            const httpEndPoint = 'products';
            this.HttpService.Post<any>(httpEndPoint, this.Data).pipe(
                catchError((error: any, caught: Observable<any>) => {
                    let errMsg = error.message;
                    alert(errMsg)
                    return of();
                })).subscribe(
                    {
                        next: (response: any) => {
                            this.Data = response;
                            this.DialogRef.close(this.Data);
                        },
                        error: errorResponse => {
                            let errMsg = errorResponse.message;
                            alert(errMsg)
                        }
                    })
        } else {
            const httpEndPoint = 'products/' + this.Data.id;
            this.HttpService.Put<any>(httpEndPoint, this.Data).pipe(
                catchError((error: any, caught: Observable<any>) => {
                    let errMsg = error.message;
                    alert(errMsg)
                    return of();
                })).subscribe(
                    {
                        next: (response: any) => {
                            this.Data = response;
                            this.DialogRef.close(this.Data);
                        },
                        error: errorResponse => {
                            let errMsg = errorResponse.message;
                            alert(errMsg)
                        }
                    })
        }
    }

}