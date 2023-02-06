import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonAnalyzerComponent } from './json-analyzer/json-analyzer.component';
import { LandingComponent } from './landing/landing.component';
import { NedWriterComponent } from './ned-writer/ned-writer.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full',
  },
  {
    path: 'peter',
    component: JsonAnalyzerComponent,
    pathMatch: 'full',
  },
  {
    path: 'ned',
    component: NedWriterComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
