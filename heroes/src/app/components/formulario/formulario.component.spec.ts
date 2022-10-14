import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ServicioHeroesService} from '../../services/servicio-heroes.service';
import {HeroeModel} from '../../models/heroe-model';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

const mockHeroes: HeroeModel[] = [
  {id: 1, nombre : 'Superman'},
  {id: 2, nombre : 'Spiderman'},
  {id: 3, nombre : 'Batman'},
  {id: 4, nombre : 'Manolito el fuerte'},
  {id: 5, nombre : 'Hulk'},
  {id: 6, nombre : 'IronMan'},
  {id: 7, nombre : 'Goku'}
];
describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let heroesService: ServicioHeroesService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        ServicioHeroesService,
        TranslateService,
        FormBuilder
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });
  beforeEach(inject([ServicioHeroesService], s => {
    heroesService = s;
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.heroeEditar = { id: 1, nombre: 'Superman'};
    component.formulario = formBuilder.group({
      nombre: new FormControl(
        {
          value: [component.heroeEditar.nombre]
        }, Validators.required),
      nombreAniadir: new FormControl(
        {
          value: ['']
        }, Validators.required)
    });
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.formulario.controls).toBeTruthy();
    expect(component.requeridoEditar).toBeFalse();
    expect(component.requeridoAniadir).toBeFalse();
  });
  it('enviar', () => {
    component.heroeEditar = mockHeroes[0];
    component.formulario.controls.nombre.setValue('SuperHeroe');
    component.mostrarEditar = true;
    component.enviar();
    component.heroeEditar = { id: mockHeroes[mockHeroes.length - 1].id + 1, nombre: ''};
    component.formulario.controls.nombreAniadir.setValue('Maradona');
    component.mostrarEditar = false;
    component.enviar();
  });
});
