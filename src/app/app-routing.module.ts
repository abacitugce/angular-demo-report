import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionPageComponent } from './product/action-page/action-page.component';
import { ListViewComponent } from './product/list-view/list-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListViewComponent },
  { path: 'list/edit', component: ActionPageComponent},
  { path: 'list/add', component: ActionPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
