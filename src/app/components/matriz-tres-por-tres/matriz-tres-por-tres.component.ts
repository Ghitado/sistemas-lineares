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

  constructor(private formBuilderService: FormBuilder) {}

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
    const _ = this.form.value;

    this.detA = _.a! * (_.e! * _.i! - _.h! * _.f!) - _.b! * (_.d! * _.i! - _.g! * _.f!) + _.c! * (_.d! * _.h! - _.g! * _.e!);
    this.detX = _.r1! * (_.e! * _.i! - _.h! * _.f!) - _.b! * (_.r2! * _.i! - _.r3! * _.f!) + _.c! * (_.r2! * _.h! - _.r3! * _.e!);
    this.detY = _.a! * (_.r2! * _.i! - _.r3! * _.f!) - _.r1! * (_.d! * _.i! - _.g! * _.f!) + _.c! * (_.d! * _.r3! - _.g! * _.r2!);
    this.detZ = _.a! * (_.e! * _.r3! - _.h! * _.r2!) - _.b! * (_.d! * _.r3! - _.g! * _.r2!) + _.r1! * (_.d! * _.h! - _.g! * _.e!);
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
    } else if ((this.detX == 0) || (this.detY == 0) || (this.detZ == 0)) {
      this.classification = "Sistema Possivel e Indeterminado";
    } else {
      this.classification = "Sistema Impossivel";
    }
  }
}

