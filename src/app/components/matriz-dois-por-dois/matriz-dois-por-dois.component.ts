import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-matriz-dois-por-dois',
  standalone: true,
  imports: [FormsModule, InputNumberModule, FloatLabelModule, DividerModule, ButtonModule],
  templateUrl: './matriz-dois-por-dois.component.html',
  styleUrl: './matriz-dois-por-dois.component.scss'
})
export class MatrizDoisPorDoisComponent {
  a!: number; b!: number;
  c!: number; d!: number;
  x!: number; y!: number;

  isFilled() {
    if ((this.a || this.b || this.c || this.d || this.x || this.y) == undefined)
      alert("Preencha todos os campos!")
  }

  clear() {

  }
}
