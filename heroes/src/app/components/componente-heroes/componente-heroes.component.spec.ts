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
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {async} from '@angular/core/testing';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteHeroesComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        MatTableModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        ServicioHeroesService,
        TranslateService,

      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
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
    component.formBuscar = formBuilder.group({
      busqueda: [''],
      busquedaPorId: ['']
    });
    fixture.detectChanges();
  });


  it(' create', () => {
    expect(component).toBeTruthy();
  });
  it(' buscar', () => {
    heroesService.setHeroes(mockHeroes);
    heroesService.actualizar();
    component.heroes = mockHeroes;
    fixture.detectChanges();
    component.formBuscar.setValue({
      busqueda: 'S',
      busquedaPorId: '1'
    });
    expect(component.formBuscar.controls.busqueda.value).toBe('S');
    fixture.detectChanges();
    let resultado = heroesService.consultarHeroePorBusqueda(component.formBuscar.controls.busqueda.value);
    component.buscar();
    fixture.detectChanges();
    expect(resultado).toEqual([heroesService.heroes[0], heroesService.heroes[1]]);
    component.formBuscar.setValue({
      busqueda: 'algoQueNoEncuentra',
      busquedaPorId: '1'
    });
    resultado = heroesService.consultarHeroePorBusqueda(component.formBuscar.controls.busqueda.value);
    fixture.detectChanges();
    component.buscar();
    fixture.detectChanges();
    expect(resultado).toEqual([]);

  });
  it(' buscar por Id', () => {
    heroesService.setHeroes(mockHeroes);
    heroesService.actualizar();
    component.heroes = mockHeroes;
    fixture.detectChanges();
    heroesService.heroes = mockHeroes;
    component.formBuscar.setValue({
      busqueda: 'S',
      busquedaPorId: '1'
    });
    expect(component.formBuscar.controls.busquedaPorId.value).toBe('1');
    fixture.detectChanges();
    const resultado = heroesService.consultarHeroe(Number(component.formBuscar.controls.busquedaPorId.value));
    component.buscarPorId();
    heroesService.actualizar();
    fixture.detectChanges();
    expect(resultado).toEqual([heroesService.heroes[0]]);
  });
  it(' cargar Heroes', () => {
    heroesService.setHeroes(mockHeroes);
    component.heroes = mockHeroes;
    component.recargarDataSource();
    component.ocultarFormularios();
    expect(component.heroes).toEqual(mockHeroes);
  });
  it(' recargar DataSource', () => {
    component.heroes = mockHeroes;
    component.dataSource = new MatTableDataSource<HeroeModel>(component.heroes);
    component.dataSource.paginator = component.paginator;
    heroesService.setHeroes(mockHeroes);
    component.recargarDataSource();
    expect(component.dataSource.data).toEqual(mockHeroes);
  });
  it(' mostrar Form Editar', () => {
    heroesService.setHeroes(mockHeroes);
    component.mostrarFormEditar(mockHeroes[0]);
    component.formEditar = formBuilder.group({
      nombre: new FormControl(component.heroeEditar.nombre, [Validators.required])
    });
    expect(component.mostrarEditar).toEqual(true);
    expect(component.mostrarAniadir).toEqual(false);
    expect(component.heroeEditar).toEqual(mockHeroes[0]);
    expect(component.formEditar.get('nombre')).toBeTruthy();
  });
  it(' ocultar Formularios', () => {
    component.ocultarFormularios();
    expect(component.mostrarEditar).toEqual(false);
    expect(component.mostrarAniadir).toEqual(false);
  });


  it(' mostrar Form Añadir', () => {
    heroesService.setHeroes(mockHeroes);
    component.heroes = mockHeroes;
    component.heroeEditar = { id: component.heroes.length + 1, nombre: ''};
    component.mostrarFormAniadir();
    component.formAniadir = formBuilder.group({
      nombre: new FormControl(component.heroeEditar.nombre, [Validators.required])
    });
    expect(component.mostrarAniadir).toEqual(true);
    expect(component.mostrarEditar).toEqual(false);
    expect(component.heroeEditar).toEqual({ id: component.heroes[component.heroes.length - 1].id + 1 , nombre: ''});
    expect(component.formAniadir.get('nombre').value).toEqual('');
  });
  it(' eliminar', () => {
    heroesService.setHeroes(mockHeroes);
    component.heroes = mockHeroes;
    const longitudArray = mockHeroes.length;
    component.eliminar(mockHeroes[0].id);
    expect(mockHeroes.length).toEqual(longitudArray - 1);
  });
  it(' recargar', () => {
    component.recargar(mockHeroes);
    expect(component.heroes).toEqual(mockHeroes);
    expect(component.dataSource.data).toEqual(mockHeroes);
    heroesService.setHeroes(mockHeroes);
    component.heroes = mockHeroes;
    const longitudArray = mockHeroes.length;
    component.eliminar(mockHeroes[0].id);
    expect(mockHeroes.length).toEqual(longitudArray - 1);
  });
});
