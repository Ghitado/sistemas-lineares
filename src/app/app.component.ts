import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { NavbarComponent } from "./shared/navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
      CommonModule,
      RouterOutlet,
      NavbarComponent,
      CardModule,
      ReactiveFormsModule,
    ]
})

export class AppComponent {

  changeTitle(): string {
    const currentPath = window.location.pathname;

    if (currentPath === '/')
      return 'Xês'

    if (currentPath === '/matriz-dois-por-dois')
      return 'Matriz 2x2'

    if (currentPath === '/matriz-tres-por-tres')
      return 'Matriz 3x3'

    return '';
  }
}
