import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioIdiomaComponent } from './cambio-idioma.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ServicioHeroesService} from '../../services/servicio-heroes.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('CambioIdiomaComponent', () => {
  let component: CambioIdiomaComponent;
  let fixture: ComponentFixture<CambioIdiomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioIdiomaComponent ],
      imports: [
        TranslateModule.forRoot()
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
    fixture = TestBed.createComponent(CambioIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
