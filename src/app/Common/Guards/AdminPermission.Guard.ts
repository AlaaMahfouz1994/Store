import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoleEnum } from '../Enums/Role.Enum';
import { HelperService } from '../Services/HelperService';

@Injectable({
  providedIn: 'root'
})
export class AdminPermissionGuard implements CanActivate {
  constructor(private HelperService: HelperService,
  ) { }
  canActivate(): boolean {

    let isAdmin = this.HelperService.IsAdmin();
    if (isAdmin) {
      return true;
    } else {
      alert("You don't have a permission to access this screen")
      return false
    }
  }

}
