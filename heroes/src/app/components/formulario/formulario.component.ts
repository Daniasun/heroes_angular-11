import {Component, Input, OnInit} from '@angular/core';
import {HeroeModel} from '../../models/heroe-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicioHeroesService} from '../../services/servicio-heroes.service';
import {SpinnerService} from '../../services/spinner.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{
  public formulario: FormGroup;
  public requeridoEditar: boolean;
  public requeridoAniadir: boolean;
  @Input() public heroeEditar: HeroeModel;
  @Input() public mostrarEditar: boolean;
  @Input() public mostrarAniadir: boolean;
  constructor(private heroesService: ServicioHeroesService,
              private formBuilder: FormBuilder,
              private spinnerService: SpinnerService) {
    this.requeridoEditar = false;
    this.requeridoAniadir = false;
  }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: [this.heroeEditar.nombre, [Validators.required]],
      nombreAniadir: ['', [Validators.required]],
    });
  }

  public enviar(): void {
    this.mostrarEditar ?
      !this.formulario.get('nombre').valid ? this.requeridoEditar = true :
        setTimeout(() =>  {
          this.editar();
        }, 1) :
      !this.formulario.get('nombreAniadir').valid ? this.requeridoAniadir = true :
        setTimeout(() =>  {
          this.aniadir();
        }, 1);
  }
  public editar(): void {
    setTimeout((() => this.spinnerService.hideSpinner()), 100);
    this.requeridoAniadir = false;
    this.requeridoEditar = false;
    this.heroeEditar.nombre = this.formulario.get('nombre').value;
    this.heroesService.modificarHeroe(this.heroeEditar)
      .subscribe(
        (response: HeroeModel) => {
        },
        error => {
          console.log(error);
        });
    this.heroesService.ocultarForm.next(true);
  }
  public aniadir(): void {
    this.requeridoAniadir = false;
    this.requeridoEditar = false;
    this.heroeEditar.nombre = this.formulario.get('nombreAniadir').value;
    this.heroesService.aniadirHeroe(this.heroeEditar)
      .subscribe(
        (response: HeroeModel) => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    this.heroesService.ocultarForm.next(true);
  }
}
