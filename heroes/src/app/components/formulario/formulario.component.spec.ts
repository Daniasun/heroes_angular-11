import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
        TranslateService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(inject([ServicioHeroesService], s => {
    heroesService = s;
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
  }));
  beforeEach(inject([FormBuilder], s => {
    formBuilder = s;
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.requeridoEditar).toBeFalse();
    expect(component.requeridoAniadir).toBeFalse();
  });
  it(' editar', () => {
    component.heroeEditar = { id: 1, nombre: 'Superman'};
    component.formEditar = formBuilder.group({
      nombre: ['', [Validators.required]]
    });
    component.formEditar.setValue({
      nombre: 'Jimmy'
    });
    component.editar();
    fixture.detectChanges();
    expect(component.formEditar.valid).toBeTrue();
    expect(component.requeridoEditar).toBeFalse();
    component.formEditar.setValue({
      nombre: ''
    });
    component.editar();
    fixture.detectChanges();
    expect(component.formEditar.valid).toBeFalse();
    expect(component.requeridoEditar).toBeTrue();
  });
  it(' aniadir', () => {
    component.heroeEditar = { id: mockHeroes[mockHeroes.length - 1].id, nombre: ''};
    component.formAniadir = formBuilder.group({
      nombre: ['', [Validators.required]]
    });
    component.formAniadir.setValue({
      nombre: 'Pepe'
    });
    component.aniadir();
    fixture.detectChanges();
    expect(component.formAniadir.valid).toBeTrue();
    expect(component.requeridoAniadir).toBeFalse();
    component.formAniadir.setValue({
      nombre: ''
    });
    component.aniadir();
    fixture.detectChanges();
    expect(component.formAniadir.valid).toBeFalse();
    expect(component.requeridoAniadir).toBeTrue();
  });
});
