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

  protected x!: number | string | null;
  protected y!: number | string | null;
  protected detA!: number | null;
  protected detX!: number | null;
  protected detY!: number | null;
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
    this.detA = null;
    this.detX = null;
    this.detY = null;
    this.classification = '';
  }

  calculate() {
    this.calculateDeterminants();
    this.findXY()
    this.toRank();
  }

  calculateDeterminants() {
    const {a,b,c,d,r1,r2} = this.form.value;

    this.detA = (a! * d!) - (b! * c!);
    this.detX = (r1! * d!) - (r2! * b!);
    this.detY = (a! * r2!) - (c! * r1!);
  }

  findXY() {
    if (this.detA !== 0) {
      this.x = this.detX! / this.detA!;
      this.y = this.detY! / this.detA!;
    } else {
      this.x = 'Indeterminado';
      this.y = 'Indeterminado';
    }
  }

  toRank() {
    const _ = this.form.value;

    if (this.detA !== 0) {
      this.classification = "Sistema determinado";
    } else if ((this.detX == 0) && (this.detY == 0)) {
      this.classification = "Sistema Possivel e Indeterminado";
    } else {
      this.classification = "Sistema Impossivel";
    }
  }

}
