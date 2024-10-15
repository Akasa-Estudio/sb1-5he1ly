import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { BrandShowcaseComponent } from './brand-showcase/brand-showcase.component'

const routes: Routes = [
  { path: '', redirectTo: '/brand-showcase', pathMatch: 'full' },
  { path: 'brand-showcase', component: BrandShowcaseComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}