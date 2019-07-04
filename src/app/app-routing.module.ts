import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { CanActivate } from '@angular/router/src/utils/preactivation';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard]},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'dengue', loadChildren: './pages/dengue/dengue.module#DenguePageModule' , canActivate: [AuthGuard]},
  { path: 'dengue/:id', loadChildren: './pages/dengue/dengue.module#DenguePageModule' , canActivate: [AuthGuard]},
  { path: 'raiva', loadChildren: './pages/raiva/raiva.module#RaivaPageModule' , canActivate: [AuthGuard]},
  { path: 'leishmaniose', loadChildren: './pages/leishmaniose/leishmaniose.module#LeishmaniosePageModule', canActivate: [AuthGuard] },
  { path: 'chagas', loadChildren: './pages/chagas/chagas.module#ChagasPageModule' , canActivate: [AuthGuard]},
  { path: 'agua', loadChildren: './pages/agua/agua.module#AguaPageModule' , canActivate: [AuthGuard]},
  { path: 'leptospirose', loadChildren: './pages/leptospirose/leptospirose.module#LeptospirosePageModule' , canActivate: [AuthGuard]},
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
