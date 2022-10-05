import {Component, OnInit, ViewChild} from '@angular/core';
import {ServicioHeroesService} from '../../services/servicio-heroes.service';
import { HeroeModel } from '../../models/heroe-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogoConfirmacionComponent} from '../dialogo-confirmacion/dialogo-confirmacion.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-componente-heroes',
  templateUrl: './componente-heroes.component.html',
  styleUrls: ['./componente-heroes.component.scss']
})
export class ComponenteHeroesComponent implements OnInit {

  constructor(private heroesService: ServicioHeroesService,
              private formBuilder: FormBuilder,
              private dialogo: MatDialog,
              private translateService: TranslateService) {
  }
  public formBuscar: FormGroup;
  public formEditar: FormGroup;
  public formAniadir: FormGroup;
  public mostrarEditar = false;
  public mostrarAniadir = false;
  public heroes: HeroeModel[];
  public heroesActualizados$ = this.heroesService.heroesActualizados.asObservable();
  public heroeEditar$ = this.heroesService.heroeEditar.asObservable();
  public heroeEditar: HeroeModel;
  public dataSource: MatTableDataSource<HeroeModel>;
  public displayColumns: string[] = ['id', 'nombre', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(DialogoConfirmacionComponent, {static: false}) dialogoConfirmacionComponent: DialogoConfirmacionComponent;
  ngOnInit(): void {
    this.heroes = this.heroesService.consultarTodos();
    this.cargarHeroes();
    this.cargarForms();
  }
  public cargarForms(): void {
    this.formBuscar = this.formBuilder.group({
      busqueda: [''],
      busquedaPorId: ['']
    });
    this.heroeEditar$.subscribe((value: HeroeModel) => {
      this.heroeEditar = value;
      this.formEditar = this.formBuilder.group({
        nombre: [value.nombre]
      });
      this.formAniadir = this.formBuilder.group({
        nombre: [null, { validators: [Validators.required] }]
      });
    });
  }
  public buscar(): void{
    const resultado = this.heroesService.consultarHeroePorBusqueda(this.formBuscar.controls.busqueda.value);
    this.recargar(resultado);
  }
  public buscarPorId(): void{
    const id = this.formBuscar.controls.busquedaPorId.value ? Number(this.formBuscar.controls.busquedaPorId.value) : -1;
    const resultado = this.heroesService.consultarHeroe(id);
    this.recargar(resultado);
  }
  public recargar(resultado: any): void {
    this.heroes = resultado;
    this.dataSource.data = resultado;
  }
  public cargarHeroes(): void {
    this.heroesActualizados$.subscribe((value: HeroeModel[]) => {
      this.heroes = value;
      this.recargarDataSource();
      this.ocultarFormularios();
    });
  }
  public recargarDataSource(): void {
    this.dataSource = new MatTableDataSource<HeroeModel>(this.heroes);
    this.dataSource.paginator = this.paginator;
  }
  public mostrarFormEditar(heroe: HeroeModel): void {
    this.heroesService.setHeroeEditar(heroe);
    this.mostrarEditar = true;
    this.mostrarAniadir = false;
  }
  public ocultarFormularios(): void {
    this.mostrarAniadir = false;
    this.mostrarEditar = false;
  }
  public mostrarFormAniadir(): void {
    this.heroesService.setHeroeEditar({ id: this.heroes[this.heroes.length - 1].id + 1, nombre: ''});
    this.mostrarAniadir = true;
    this.mostrarEditar = false;
  }
  public eliminar(id: number): void {
    this.mostrarDialogo(id);
  }
  public mostrarDialogo(id: number): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: this.translateService.instant('heroes.seguro')
      })
      .afterClosed()
      .subscribe((confirmado: boolean) => {
        if (confirmado) {
          this.ocultarFormularios();
          this.heroesService.eliminarHeroe(id);
          this.heroesService.actualizar();
        } else {
          this.dialogoConfirmacionComponent.cerrarDialogo();
        }
      });
  }
}
