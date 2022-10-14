import {Component, OnInit, ViewChild} from '@angular/core';
import {ServicioHeroesService} from '../../services/servicio-heroes.service';
import { HeroeModel } from '../../models/heroe-model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogoConfirmacionComponent} from '../dialogo-confirmacion/dialogo-confirmacion.component';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SpinnerService} from '../../services/spinner.service';

@Component({
  selector: 'app-componente-heroes',
  templateUrl: './componente-heroes.component.html',
  styleUrls: ['./componente-heroes.component.scss']
})
export class ComponenteHeroesComponent implements OnInit {
  public formBuscar: FormGroup;
  public mostrarEditar: boolean;
  public mostrarAniadir: boolean;
  public heroes: HeroeModel[];
  public heroeEditar$: Observable<HeroeModel>;
  public ocultarForm$: Observable<boolean>;
  public heroeEditar: HeroeModel;
  public dataSource: MatTableDataSource<HeroeModel>;
  public displayColumns: string[];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(DialogoConfirmacionComponent, {static: false}) dialogoConfirmacionComponent: DialogoConfirmacionComponent;
  constructor(private heroesService: ServicioHeroesService,
              private formBuilder: FormBuilder,
              private dialogo: MatDialog,
              private translateService: TranslateService,
              private router: Router,
              private route: ActivatedRoute) {
    this.heroeEditar$ = this.heroesService.heroeEditar.asObservable();
    this.mostrarEditar = false;
    this.mostrarAniadir = false;
    this.displayColumns = ['id', 'nombre', 'actions'];
    this.ocultarForm$ = this.heroesService.ocultarForm.asObservable();
  }

  ngOnInit(): void {
    this.ocultarForm$.subscribe((value: boolean) => {
      this.ocultarFormularios();
      this.cargarHeroes();
    });
    this.heroeEditar$.subscribe((value: HeroeModel) => {
      this.heroeEditar = value;
    });
    this.route.queryParams.subscribe(params => {
      params.form === 'editar' ? this.mostrarFormularioEditar() :
        params.form === 'añadir' ? this.mostrarFormularioAniadir() :
      this.ocultarFormularios();
    });
    this.cargarHeroes();
    this.cargarForms();
  }
  public mostrarFormularioEditar(): void {
    this.mostrarEditar = true;
    this.mostrarAniadir = false;
  }
  public mostrarFormularioAniadir(): void {
    this.mostrarEditar = false;
    this.mostrarAniadir = true;
  }
  public cargarForms(): void {
    this.formBuscar = this.formBuilder.group({
      busqueda: [''],
      busquedaPorId: ['']
    });
  }
  public cargarHeroes(): void {
    this.heroesService.consultarTodos()
      .subscribe(
        (response: HeroeModel[]) => {
          this.heroes = response;
          this.heroesService.setHeroes(response);
          this.recargarDataSource();
          this.ocultarFormularios();
        },
        error => {
          console.log(error);
        });
  }
  public buscar(): void{
    this.formBuscar.controls.busquedaPorId.reset('');
    this.heroesService.consultarHeroePorBusqueda(this.formBuscar.controls.busqueda.value)
      .subscribe(
      (response: HeroeModel[]) => {
        !response.length ? this.recargar([response]) : this.recargar(response);
      },
      error => {
        console.log(error);
      });
  }
  public buscarPorId(): void{
    this.formBuscar.controls.busqueda.reset('');
    this.heroesService.consultarHeroe(this.formBuscar.controls.busquedaPorId.value)
      .subscribe(
      (response: HeroeModel[]) => {
        !response.length ? this.recargar([response]) : this.recargar(response);
      },
      error => {
        this.recargar([]);
      });
  }
  public recargar(resultado: any): void {
    this.heroes = resultado;
    this.dataSource.data = resultado;
  }
  public recargarDataSource(): void {
    this.dataSource = new MatTableDataSource<HeroeModel>(this.heroes);
    this.dataSource.paginator = this.paginator;
  }
  public mostrarFormEditar(heroe: HeroeModel): void {
    this.heroesService.setHeroeEditar(heroe);
    this.router.navigate(['tabla-heroes'], { queryParams: { form: 'editar' } });
  }
  public ocultarFormularios(): void {
    this.router.navigate(['tabla-heroes']);
    this.mostrarAniadir = false;
    this.mostrarEditar = false;
  }
  public mostrarFormAniadir(): void {
    this.heroesService.setHeroeEditar({ id: this.heroes[this.heroes.length - 1].id + 1, nombre: ''});
    this.router.navigate(['tabla-heroes'], { queryParams: { form: 'añadir' } });
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
          this.heroesService.eliminarHeroe(id)
            .subscribe(
            (response: HeroeModel) => {
              console.log(response);
              this.cargarHeroes();
            },
            error => {
              console.log(error);
            });
          this.ocultarFormularios();
        } else {
          this.dialogoConfirmacionComponent.cerrarDialogo();
        }
      });
  }
}
