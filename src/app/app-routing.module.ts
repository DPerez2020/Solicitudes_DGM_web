import { NotFoundComponent } from './core/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:"person",
    loadChildren:()=>import("./person/person.module").then(m=>m.PersonModule)
  },
  {
    path:"**",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
      enableTracing:false,
      preloadingStrategy:PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
