import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JsonAnalyzerComponent } from './json-analyzer/json-analyzer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NedWriterComponent } from './ned-writer/ned-writer.component';

import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JsonAnalyzerComponent,
    NotFoundComponent,
    NedWriterComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
