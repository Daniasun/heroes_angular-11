import {Component, Input, OnInit} from '@angular/core';
import {HeroeModel} from '../../models/heroe-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicioHeroesService} from '../../services/servicio-heroes.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {

  @Input() public formEditar: FormGroup;
  @Input() public formAniadir: FormGroup;
  public requeridoEditar = false;
  public requeridoAniadir = false;
  @Input() public heroeEditar: HeroeModel;
  @Input() public mostrarEditar = false;
  @Input() public mostrarAniadir = false;

  constructor(private heroesService: ServicioHeroesService) {
  }
  public editar(): void {
    !this.formEditar.valid ? this.requeridoEditar = true :
      setTimeout(() =>  {
        this.requeridoEditar = false;
        this.heroeEditar.nombre = this.formEditar.get('nombre').value;
        this.heroesService.modificarHeroe(this.heroeEditar);
        this.heroesService.actualizar();
      }, 1);
  }
  public aniadir(): void {
    !this.formAniadir.valid ? this.requeridoAniadir = true :
      setTimeout(() =>  {
        this.requeridoAniadir = false;
        this.heroeEditar.nombre = this.formAniadir.get('nombre').value;
        this.heroesService.aniadirHeroe(this.heroeEditar);
        this.heroesService.actualizar();
      }, 1);
  }
}
