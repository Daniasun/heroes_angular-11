import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ComponenteHeroesComponent} from './componente-heroes.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ServicioHeroesService} from '../../services/servicio-heroes.service';
import {ComponenteHeroesRoutingModule} from './componente-heroes-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {FormularioModule} from '../formulario/formulario.module';



@NgModule({
  declarations: [
    ComponenteHeroesComponent
  ],
  imports: [
    CommonModule,
    ComponenteHeroesRoutingModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forChild(),
    FormularioModule,
  ],
  exports: [
    ComponenteHeroesComponent
  ],
  providers: [
    ServicioHeroesService
  ]
})
export class ComponenteHeroesModule { }
