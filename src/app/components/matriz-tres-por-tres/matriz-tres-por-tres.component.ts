import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-matriz-tres-por-tres',
  standalone: true,
  imports: [FormsModule, InputNumberModule, FloatLabelModule, DividerModule, ButtonModule],
  templateUrl: './matriz-tres-por-tres.component.html',
  styleUrl: './matriz-tres-por-tres.component.scss'
})

export class MatrizTresPorTresComponent {

  a!: number; b!: number; c!: number;
  d!: number; e!: number; f!: number;
  g!: number; h!: number; i!: number;
  x!: number; y!: number; z!: number;

  isFilled() {
    if ((this.a || this.b || this.c || this.d || this.e || this.f || this.g || this.h || this.i || this.x || this.y || this.z) == undefined)
      alert("Preencha todos os campos!")
  }

  clear() {

  }
}
