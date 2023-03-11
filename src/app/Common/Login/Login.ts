import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HelperService } from '../Services/HelperService';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RoleEnum } from '../Enums/Role.Enum';
import { StorageEnum } from '../Enums/Storage.Enum';

@Component({
    standalone: true,
    templateUrl: './Login.html',
    styleUrls: ['./Login.css'],
    imports: [FormsModule, CommonModule, MatButtonModule, ReactiveFormsModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        TranslateModule
    ]

})
export class LoginComponent {
    constructor(
        private HelperService: HelperService,
        private Renderer2: Renderer2,
        private TranslateService: TranslateService,
        private router: Router,
    ) { }

    username: string = "";
    password: string = "";
    show: boolean = false;
    Login() {
        const users = this.HelperService.getUsers();
        const index = users.findIndex((row) => row.username === this.username);

        if (index == -1) {
            return alert('Invalid Username or Password')
        }

        this.HelperService.SetLocalStorage(StorageEnum.CURRENT_USER, users[index]);

        const roleId = users[index].roleId;

        if (roleId == RoleEnum.ADMIN) {
            this.router.navigateByUrl('admin/product-list');
        } else if (roleId == RoleEnum.USER) {
            this.router.navigateByUrl('user/category-list');
        }

    }

    Language(renderer2: Renderer2, lang: string): void {
        this.TranslateService.use(lang).subscribe(x => {
            this.HelperService.SetLocalStorage(StorageEnum.LANGUAGE, lang);
            renderer2.setAttribute(document.querySelector('html'), 'dir', this.TranslateService.instant('dir'));
        });
    }

    ChangeLanguage(lang: string): void {
        this.Language(this.Renderer2, lang);
    }

}
