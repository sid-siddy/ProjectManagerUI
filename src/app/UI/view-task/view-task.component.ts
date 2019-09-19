import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Project } from 'src/app/models/project';
import { SharedService } from 'src/app/services/sharedservice';
import { TitleService } from 'src/app/services/titleservice';
import { Router } from '@angular/router';
import { identity } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-viewtask',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewtaskComponent implements OnInit {
item:Task;
Tasks:Task[];Tasks1:Task[];
projects:Project[];
Taskidget:number;
logedInForm:FormGroup;
objarray1:any=[];
display='none';
Recordadded:string;
  constructor(private _service:SharedService,private _route:Router, private _title:TitleService) { 
    this.item=new Task();
    this._service.GetAllProjects().subscribe(i=>this.projects=i);    
    this._service.GetAllTasks().subscribe(i=>this.Tasks=i);    
    this._service.GetAllTasks().subscribe(i=>this.Tasks1=i);    
  }
  projectconfig = {
    displayKey:"ProjectName",//if objects array passed which key to be displayed defaults to description,
    search:true //enables the search plugin to search in the list  
  } 
  ngOnInit() {  
    this._title.setTitle('VIEW TASK');
    localStorage.setItem("eflag","False");
    this.logedInForm = new FormGroup({
      countryCode: new FormControl("countryCode",Validators.compose([Validators.required])     
      )});     
  }
  Edit(id:number){      
    this._route.navigateByUrl('/updatetask/'+id);
    //this._service.Searchtask(id).subscribe(i=>this.item=i); 
    //let key="1";
    this.Taskidget=id;   
   // console.log(this.Taskidget);   
   this._title.settaskid(id);
    localStorage.setItem("eflag","True");
    //this._title.setTitle('Update Task');
    this._service.GetAllProjects().subscribe(i=>this.projects=i);  
  }
  StartDateclick(){    
    this.Tasks.sort(function(a,b){
      var StartDateA=a.TStartDate;
      var StartDateB=b.TStartDate;
      if(StartDateA<StartDateB)
      return -1;   
    });
  }
  EndDateclick(){    
    this.Tasks.sort(function(a,b){
      var EndDateA=a.TEndDate;
      var EndDateB=b.TEndDate;
      if(EndDateA<EndDateB)
      return -1;   
    });    
  }
  Priorityclick(){    
    this.Tasks.sort(function(a,b){
      var PriorityA=a.TPriority;
      var PriorityB=b.TPriority;
      if(PriorityA<PriorityB)
      return -1;   
    });
  }
  Completed(){    
   this.Tasks.sort(function(a,b){
  var CompletedA=a.TStatus;
  var CompletedB=b.TStatus;
  if(CompletedA<CompletedB)
  return -1;     
    } );
   }
  Delete(id:number)
  {     
    this._service.Deletetask(id).subscribe(
      suc => 
      {
        this.Tasks = this.Tasks1.filter((e) =>{
          return e.TaskId !== id;
        });
      }
    );   
    $('#txtProject').val(''); 
    this.objarray1=[];
    }
  EndTask(id:number){
    this._service.EndTask(id).subscribe(
      suc => 
      {
        this._service.GetAllTasks().subscribe(i=>this.Tasks=i);
  })  
  $('#txtProject').val('');
  this.objarray1=[];
};
openModal(){
  this.display='block';
}
onCloseHandled(){   
  this.display='none';     
}
mdfLogin(data){  
  this.display = 'none';
   }
   projectselection(){         
    $('#txtProject').val(this.objarray1.ProjectName);          
    this.Searchbyprojectname(this.objarray1.ProjectId);
    console.log(this.objarray1.ProjectName);    
  }
    Searchbyprojectname(projectId:number)
  {
    if((projectId===undefined) || (projectId===null))
    {
    
    }
    else
    {   
    this.Tasks=this.Tasks1.filter(i=>i.ProjectId==projectId);   
    }  
  }
}