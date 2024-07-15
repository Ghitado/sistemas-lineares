import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TabMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        route: '/',
        title: 'Xês'
      },
      {
        label: 'Matriz 2x2',
        icon: 'pi pi-palette',
        route: '/matriz-dois-por-dois',
        title: 'Matriz 2x2'
      },
      {
        label: 'Matriz 3x3',
        icon: 'pi pi-link',
        route: '/matriz-tres-por-tres',
        title: 'Matriz 3x3'
      }
    ];
  }
}
