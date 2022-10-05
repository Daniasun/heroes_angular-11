import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormularioComponent} from './formulario.component';

const routes: Routes = [
  { path: 'tabla-heroes', component: FormularioComponent, loadChildren: () =>
      import('../../components/formulario/formulario.module')
        .then(m => m.FormularioModule)  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioRoutingModule { }
