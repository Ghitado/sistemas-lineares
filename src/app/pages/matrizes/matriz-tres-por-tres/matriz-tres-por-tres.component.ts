import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-matriz-tres-por-tres',
  standalone: true,
  imports: [
    InputNumberModule,
    InputTextModule,
    FloatLabelModule,
    DividerModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './matriz-tres-por-tres.component.html',
  styleUrl: './matriz-tres-por-tres.component.scss'
})

export class MatrizTresPorTresComponent implements OnInit {

  protected form = this.formBuilderService.group({
    a: [0, Validators.required],
    b: [0, Validators.required],
    c: [0, Validators.required],
    d: [0, Validators.required],
    e: [0, Validators.required],
    f: [0, Validators.required],
    g: [0, Validators.required],
    h: [0, Validators.required],
    i: [0, Validators.required],
    r1: [0, Validators.required],
    r2: [0, Validators.required],
    r3: [0, Validators.required]
  })

  protected x!: number | string | null;
  protected y!: number | string | null;
  protected z!: number | string | null;
  protected detA!: number | null;
  protected detX!: number | null;
  protected detY!: number | null;
  protected detZ!: number | null;
  protected classification!: string;

  constructor (private formBuilderService: FormBuilder) { }

  ngOnInit(): void {
    this.clear();
  }

  isFilled() {
    if (this.form.valid) {
      this.calculate();
    } else {
      alert("Preencha todos os campos!");
    }
  }

  clear() {
    this.form.reset();
    this.x = null;
    this.y = null;
    this.z = null;
    this.detA = null;
    this.detX = null;
    this.detY = null;
    this.detZ = null;
    this.classification = '';
  }

  calculate() {
    this.calculateDeterminants();
    this.findXYZ()
    this.toRank();
  }

  calculateDeterminants() {
    const { a, b, c, d, e, f, g, h, i, r1, r2, r3 } = this.form.value;

    this.detA = a! * (e! * i! - h! * f!) - b! * (d! * i! - g! * f!) + c! * (d! * h! - g! * e!);
    this.detX = r1! * (e! * i! - h! * f!) - b! * (r2! * i! - r3! * f!) + c! * (r2! * h! - r3! * e!);
    this.detY = a! * (r2! * i! - r3! * f!) - r1! * (d! * i! - g! * f!) + c! * (d! * r3! - g! * r2!);
    this.detZ = a! * (e! * r3! - h! * r2!) - b! * (d! * r3! - g! * r2!) + r1! * (d! * h! - g! * e!);
  }

  findXYZ() {
    if (this.detA !== 0) {
      this.x = this.detX! / this.detA!;
      this.y = this.detY! / this.detA!;
      this.z = this.detZ! / this.detA!;
    } else {
      this.x = 'Indeterminado';
      this.y = 'Indeterminado';
      this.z = 'Indeterminado';
    }
  }

  toRank() {
    const _ = this.form.value;

    if (this.detA !== 0) {
      this.classification = "Sistema determinado";
    } else if ((this.detX == 0) && (this.detY == 0) && (this.detZ == 0)) {
      this.classification = "Sistema Possivel e Indeterminado";
    } else {
      this.classification = "Sistema Impossivel";
    }
  }
}

