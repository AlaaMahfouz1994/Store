import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPermissionGuard } from '../Common/Guards/AdminPermission.Guard';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				loadComponent: () => import('../Common/Login/Login'
				).then(c => c.LoginComponent)
			},
			{
				path: 'admin',
				canActivate: [AdminPermissionGuard],
				children: [
					{
						path: 'product-list',
						loadComponent: () => import('../Portals/AdminPortal/Products/ProductList/ProductList'
						).then(c => c.ProductList)
					},
				]
			},
			{
				path: 'user',
				children: [
					{
						path: 'category-list',
						loadComponent: () => import('../Portals/UserPortal/Categories/CategoryList'
						).then(c => c.CategoryList)
					},
				]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
