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

  protected x!: number;
  protected y!: number;
  protected z!: number;
  protected detA!: number;
  protected detX!: number;
  protected detY!: number;
  protected detZ!: number;
  protected X: string = '';
  protected Y: string = '';
  protected Z: string = '';
  protected det: string = '';
  protected detx: string = '';
  protected dety: string = '';
  protected detz: string = '';
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
    this.X = '';
    this.Y = '';
    this.Z = '';
    this.det = '';
    this.detx = '';
    this.dety = '';
    this.detz = '';
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

    this.det = this.detA.toString();
    this.detx = this.detX.toString();
    this.dety = this.detY.toString();
    this.detz = this.detZ.toString();
  }

  findXYZ() {
    if (this.detA !== 0) {
      this.x = this.detX / this.detA;
      this.y = this.detY / this.detA;
      this.z = this.detZ / this.detA;

      this.X = this.x.toString();
      this.Y = this.y.toString();
      this.Z = this.z.toString();
    } else {
      this.X = 'Indeterminado';
      this.Y = 'Indeterminado';
      this.Z = 'Indeterminado';
    }
  }

  toRank() {
    const _ = this.form.value;

    if (this.detA !== 0) {
      this.classification = "Sistema determinado";
    } else if ((_.a!/_.c! === _.b!/_.d!) && (_.a!/_.c! === _.r1!/_.r2!) && (_.b!/_.d! === _.r1!/_.r2!)) {
      this.classification = "Sistema Possivel e Indeterminado";
    } else {
      this.classification = "Sistema Impossivel";
    }
  }
}

