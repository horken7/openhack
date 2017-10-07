import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { LivingComponent } from './living.component';
import { WorkComponent } from './work.component';
import { MapComponent } from './map.component';
import { ChoiceService }  from './choice.service';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    LivingComponent,
    WorkComponent,
    MapComponent
  ],
  providers: [ ChoiceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }