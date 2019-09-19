import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes, RouteConfigLoadEnd} from '@angular/router'
import { AppComponent } from './app.component';
import { AddtaskComponent } from './UI/add-task/add-task.component';
import { AddprojectComponent } from './UI/add-project/add-project.component';
import { AdduserComponent } from './UI/add-user/add-user.component';
import { FilterPipe } from './pipes/filterpipe';
import { ViewtaskComponent } from './UI/view-task/view-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import {HttpModule} from '@angular/http'
import { SharedService } from './services/sharedservice';
import {HttpClientModule} from '@angular/common/http';

const appRoutes:Routes=[
  {path:'addtask', component:AddtaskComponent},
  {path:'addproject', component:AddprojectComponent},
  {path:'adduser', component:AdduserComponent},
  {path:'viewtask', component:ViewtaskComponent},
  {path:'updateuser/:UserId',component:AdduserComponent},
  {path:'updatetask/:TaskId', component:AddtaskComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    AddprojectComponent,
    AdduserComponent,
    FilterPipe,
    ViewtaskComponent     
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),SelectDropDownModule,FormsModule,HttpModule,HttpClientModule,ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
