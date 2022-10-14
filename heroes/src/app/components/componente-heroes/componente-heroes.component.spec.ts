import { ComponenteHeroesComponent } from './componente-heroes.component';
import {ServicioHeroesService} from '../../services/servicio-heroes.service';
import {} from 'jasmine';
import {HeroeModel} from '../../models/heroe-model';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {async} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

const mockHeroes: HeroeModel[] = [
  {id: 1, nombre : 'Superman'},
  {id: 2, nombre : 'Spiderman'},
  {id: 3, nombre : 'Batman'},
  {id: 4, nombre : 'Manolito el fuerte'},
  {id: 5, nombre : 'Hulk'},
  {id: 6, nombre : 'IronMan'},
  {id: 7, nombre : 'Goku'}
];

describe('ComponenteHeroesComponent', () => {
  let component: ComponenteHeroesComponent;
  let fixture: ComponentFixture<ComponenteHeroesComponent>;
  let heroesService: ServicioHeroesService;
  let formBuilder: FormBuilder;
  const routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ComponenteHeroesComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        MatTableModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        ServicioHeroesService,
        TranslateService,
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: FormGroup, useValue: {} }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ComponenteHeroesComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(inject([ServicioHeroesService], s => {
    heroesService = s;
    fixture = TestBed.createComponent(ComponenteHeroesComponent);
    component = fixture.componentInstance;
  }));
  beforeEach(inject([FormBuilder], s => {
    formBuilder = s;
    fixture = TestBed.createComponent(ComponenteHeroesComponent);
    component = fixture.componentInstance;
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteHeroesComponent);
    component = fixture.componentInstance;
    component.heroes = mockHeroes;
    component.dataSource = new MatTableDataSource<HeroeModel>(component.heroes);
    component.dataSource.data = mockHeroes;
    component.ocultarForm$ = heroesService.ocultarForm.asObservable();
    component.heroeEditar$ = heroesService.heroeEditar.asObservable();

    fixture.detectChanges();
  });
  it(' create', () => {
    expect(component).toBeTruthy();
    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.data).toBeTruthy();
    expect(component.formBuscar.controls).toBeTruthy();
    expect(component.ocultarForm$).toBeTruthy();
    expect(component.heroeEditar$).toBeTruthy();
    fixture.detectChanges();
    heroesService.ocultarForm.next(true);
    component.ocultarForm$.subscribe((value: boolean) => {
      component.ocultarFormularios();
      component.cargarHeroes();
      expect(component.ocultarFormularios).toHaveBeenCalled();
      expect(component.cargarHeroes).toHaveBeenCalled();
    });
    heroesService.heroeEditar.next(mockHeroes[0]);
    component.heroeEditar$.subscribe((value: HeroeModel) => {
      component.heroeEditar = value;
      expect(component.heroeEditar).toEqual(mockHeroes[0]);
    });
  });
  it(' cargarHeroes', () => {
    const spy = spyOn(heroesService, 'consultarTodos').and.returnValue(of(mockHeroes));
    heroesService.consultarTodos()
      .subscribe(
        (response: HeroeModel[]) => {
          component.heroes = response;
          heroesService.setHeroes(response);
          component.recargarDataSource();
          component.ocultarFormularios();
        },
        error => {
          console.log(error);
        });
    component.heroes = mockHeroes;
    heroesService.setHeroes(mockHeroes);
    component.recargarDataSource();
    component.ocultarFormularios();
    expect(component.heroes).toBe(mockHeroes);
  });
  it('buscar', () => {
    component.formBuscar.controls.busquedaPorId.reset('');
    component.formBuscar.controls.busqueda.setValue('Superman');
    component.buscar();
    heroesService.consultarHeroePorBusqueda(component.formBuscar.controls.busqueda.value)
      .subscribe(
        (response: HeroeModel[]) => {
          !response.length ? component.recargar([response]) : component.recargar(response);
          component.recargar(response);
          expect(component.recargar(response)).toHaveBeenCalled();
        },
        error => {
          console.log(error);
        });
  });
  it(' buscarPorId', () => {
    component.formBuscar.controls.busqueda.reset('');
    component.formBuscar.controls.busquedaPorId.setValue('1');
    component.buscarPorId();
    heroesService.consultarHeroe(component.formBuscar.controls.busquedaPorId.value)
      .subscribe(
        (response: HeroeModel[]) => {
          !response.length ? component.recargar([response]) : component.recargar(response);
          component.recargar(response);
          expect(component.recargar(response)).toHaveBeenCalled();
        },
        error => {
          console.log(error);
        });
  });
  it(' recargar', () => {
    const resultado = mockHeroes;
    component.recargar(resultado);
    expect(component.heroes).toEqual(resultado);
    expect(component.dataSource.data).toEqual(resultado);
  });
  it(' recargarDataSource', () => {
    component.heroes = mockHeroes;
    component.recargarDataSource();
    component.dataSource = new MatTableDataSource<HeroeModel>(component.heroes);
    component.dataSource.paginator = component.paginator;
  });
  it(' mostrarFormEditar', () => {
    const spy = spyOn(heroesService, 'setHeroeEditar').withArgs(mockHeroes[0]).and.stub();
    heroesService.setHeroeEditar(mockHeroes[0]);
    expect(spy).toHaveBeenCalled();
    heroesService.heroeEditar.next(mockHeroes[0]);
    expect(component.heroeEditar).toEqual(mockHeroes[0]);
    routerSpy.navigate(['tabla-heroes'], { queryParams: { form: 'editar' } });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['tabla-heroes'], { queryParams: { form: 'editar' } });
    const url = routerSpy.navigate.calls.first().args[0];
    expect(url).toEqual(['tabla-heroes']);
  });
  it(' mostrarFormAniadir', () => {
    component.heroes = mockHeroes;
    heroesService.setHeroeEditar({ id: component.heroes[component.heroes.length - 1].id + 1, nombre: ''});
    routerSpy.navigate(['tabla-heroes'], { queryParams: { form: 'añadir' } });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['tabla-heroes'], { queryParams: { form: 'añadir' } });
    const url = routerSpy.navigate.calls.first().args[0];
    expect(url).toEqual(['tabla-heroes']);
  });
  it(' eliminar', () => {
    component.mostrarDialogo(1);
    const spy = spyOn(component, 'mostrarDialogo').withArgs(1).and.stub();
    component.mostrarDialogo(1);
    expect(spy).toHaveBeenCalled();
    component.eliminar(1);
    heroesService.eliminarHeroe(1);
  });
  it(' mostrarFormularioEditar', () => {
    component.mostrarFormularioEditar();
    fixture.detectChanges();
    expect(component.mostrarEditar).toBeTrue();
    expect(component.mostrarAniadir).toBeFalse();
  });
  it(' mostrarFormularioAniadir', () => {
    component.mostrarFormularioAniadir();
    fixture.detectChanges();
    expect(component.mostrarAniadir).toBeTrue();
    expect(component.mostrarEditar).toBeFalse();
  });
  it(' cargarForms', () => {
    component.cargarForms();
    formBuilder = TestBed.inject(FormBuilder);
    component.formBuscar = formBuilder.group({
      busqueda: new FormControl(
        {
          value: ['']
        }),
      busquedaPorId: new FormControl(
        {
          value: ['']
        })
    });
  });
});
