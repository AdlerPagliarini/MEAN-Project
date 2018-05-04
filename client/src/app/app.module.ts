import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { FundamentalsComponent } from './components/fundamentals/fundamentals.component';

import { TaskService } from './services/task.service';
import { FundamentalService } from './services/fundamental.service';

const appRoutes: Routes = [
  {path:'', component:TasksComponent},
  {path:'fundamentals', component:FundamentalsComponent}
];

@NgModule({
  declarations: [
    AppComponent, TasksComponent, FundamentalsComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TaskService, FundamentalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
