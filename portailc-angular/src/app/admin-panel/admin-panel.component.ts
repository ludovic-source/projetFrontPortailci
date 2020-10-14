import { Component, OnInit } from '@angular/core';
import {TabMenuModule} from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Utilisateurs', icon: 'pi pi-fw pi-user', routerLink: 'users' },
      { label: 'Profils', icon: 'pi pi-fw pi-id-card', routerLink: 'profiles' }
    ];
    this.activeItem = this.items[0];
    this.router.navigate(['/admin/users']);
  }

}
