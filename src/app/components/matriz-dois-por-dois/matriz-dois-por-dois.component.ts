import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-matriz-dois-por-dois',
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
  templateUrl: './matriz-dois-por-dois.component.html',
  styleUrl: './matriz-dois-por-dois.component.scss'
})

export class MatrizDoisPorDoisComponent implements OnInit {

  protected form = this.formBuilderService.group({
    a: [0, Validators.required],
    b: [0, Validators.required],
    c: [0, Validators.required],
    d: [0, Validators.required],
    r1: [0, Validators.required],
    r2: [0, Validators.required],
  })

  protected x!: number;
  protected y!: number;
  protected detA!: number;
  protected X: string = '';
  public Y: string = '';
  protected det: string = '';
  protected classification!: string;

  constructor(private formBuilderService: FormBuilder) {}

  ngOnInit(): void {
    this.form.reset();
    this.X = '';
    this.Y = '';
    this.det = '';
    this.classification = '';
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
    this.det = '';
    this.classification = '';
  }

  calculate() {
    const { a, b, c, d, r1, r2 } = this.form.value;
    this.detA = (a! * d!) - (b! * c!);
    this.det = this.detA.toString();

    this.calcDets(a!, b!, c!, d!, r1!, r2!);
    this.toRank(a!, b!, c!, d!, r1!, r2!);
  }

  calcDets(a:number, b:number, c:number, d:number, r1:number, r2:number) {
    if (this.detA !== 0) {
      this.x = ((r1 * d) - (r2 * b)) / this.detA;
      this.y = ((a * r2) - (c * r1)) / this.detA;
      this.X = this.x.toString();
      this.Y = this.y.toString();
    } else {
      this.X = 'Indeterminado';
      this.Y = 'Indeterminado';
    }
  }

  toRank(a:number, b:number, c:number, d:number, r1:number, r2:number) {
    if (this.detA !== 0) {
      this.classification = "Sistema determinado";
    } else if ((a / c === b / d) && (a / c === r1 / r2) && (b / d === r1 / r2)) {
      this.classification = "Sistema Possivel e Indeterminado";
    } else {
      this.classification = "Sistema Impossivel";
    }
  }

}
