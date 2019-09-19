import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { User } from '../models/user';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { Parenttask } from '../models/parenttask';
//import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    // Getallusers:string='http://localhost:57019/Getallusers/';
    // Getallprojects:string='http://localhost:57019/Getallprojects/';
    // Getalltasks:string='http://localhost:57019/Getalltasks/';
    // Getallparenttasks:string='http://localhost:57019/GetallParenttask/';
    // Getbyuserid:String='http://localhost:57019/getbyuserid';
    // Getbyprojectid:String='http://localhost:57019/getbyprojectid';
    // Getbytaskid:String='http://localhost:57019/getbytaskid';
    // updateuserbyid:String='http://localhost:57019/updatebyuserid';
    // updatetaskbyid:String='http://localhost:57019/updatebytaskid';
    // updateprojectbyid:String='http://localhost:57019/updatebyprojectid';
    // Addnewuser:string='http://localhost:57019/adduser/';
    // Addnewproject:string='http://localhost:57019/addproject/';
    // Addnewtask:string='http://localhost:57019/addtask/';
    // Addnewparenttask:string='http://localhost:57019/Addparenttask/';
    // Deleteuserrecord:string='http://localhost:57019/Deleteuser'; 
    // Deleteprojectrecord:string='http://localhost:57019/Deleteproject';
    // Deletetaskrecord:string='http://localhost:57019/Deletetask';    
    // Updateendrecord:string='http://localhost:57019/Endtask';
    // Updatesuspendrecord:string='http://localhost:57019/suspendprojectbyid';
    Getallusers: string = 'http://localhost/ProjectManagerAPI1/Getallusers/';
    Getallprojects:string='http://localhost/ProjectManagerAPI1/Getallprojects/';
    Getalltasks:string='http://localhost/ProjectManagerAPI1/Getalltasks/';
    Getallparenttasks:string='http://localhost/ProjectManagerAPI1/GetallParenttask/';
    Getbyuserid:String='http://localhost/ProjectManagerAPI1/getbyuserid';
    Getbyprojectid:String='http://localhost/ProjectManagerAPI1/getbyprojectid';
    Getbytaskid:String='http://localhost/ProjectManagerAPI1/getbytaskid';
    updateuserbyid:String='http://localhost/ProjectManagerAPI1/updatebyuserid';
    updatetaskbyid:String='http://localhost/ProjectManagerAPI1/updatebytaskid';
    updateprojectbyid:String='http://localhost/ProjectManagerAPI1/updatebyprojectid';
    Addnewuser:string='http://localhost/ProjectManagerAPI1/adduser/';
    Addnewproject:string='http://localhost/ProjectManagerAPI1/addproject/';
    Addnewtask:string='http://localhost/ProjectManagerAPI1/addtask/';
    Addnewparenttask:string='http://localhost/ProjectManagerAPI1/Addparenttask/';
    Deleteuserrecord:string='http://localhost/ProjectManagerAPI1/Deleteuser'; 
    Deleteprojectrecord:string='http://localhost/ProjectManagerAPI1/Deleteproject';
    Deletetaskrecord:string='http://localhost/ProjectManagerAPI1/Deletetask';    
    Updateendrecord:string='http://localhost/ProjectManagerAPI1/Endtask';
    Updatesuspendrecord:string='http://localhost/ProjectManagerAPI1/suspendprojectbyid'; 

  // taskitem:Task[];
  // tasksubject:BehaviorSubject<Task[]>;
  taskitem:Task;
  id:number;
  tasksubject:BehaviorSubject<Task>;
  constructor(private _http:Http) {
    //this.taskitem=[];
    this.tasksubject=new BehaviorSubject(new Task());    
   // this.fetchtaskfromserver(this.id);
   }
  //  fetchtaskfromserver(id:number){
  //  return this._http.get(this.Getbytaskid+"/"+id)
  //   .map((response: Response)=><Task>response.json())
  //   .subscribe(
  //     taskitem=>{
  //       this.taskitem=taskitem[id];
  //       this.tasksubject.next(this.taskitem[id]);  
  //       console.log("sub"+this.tasksubject[0].ParentId);  
  //     //  return this.tasksubject.asObservable();   
  //     }); 
  //    // return this.tasksubject;  
  //  }
  GetAllusers():Observable<User[]>
  {
    return this._http.get(this.Getallusers).pipe(
    map((response: Response)=><User[]>response.json()));
  }
  GetAllProjects():Observable<Project[]>
  {
    return this._http.get(this.Getallprojects).pipe(
    map((response: Response)=><Project[]>response.json()));
  } 
  GetAllParentTasks():Observable<Parenttask[]>
  {
    return this._http.get(this.Getallparenttasks).pipe(
    map((response: Response)=><Parenttask[]>response.json()));
  }
  GetAllTasks():Observable<Task[]>
  {
     return this._http.get(this.Getalltasks).pipe(
     map((response: Response)=><Task[]>response.json()));    
  }
   EditUser(item:User):Observable<User[]>
 {
   return this._http.put(this.updateuserbyid+"/"+item.UserId,item).pipe(
   map((response: Response)=><User[]>response.json()));
  }
  EditProject(item:Project):Observable<Project[]>
 {
   return this._http.put(this.updateprojectbyid+"/"+item.ProjectId,item).pipe(
   map((response: Response)=><Project[]>response.json()));
  }
  EditTask(item:Task):Observable<Task[]>
 {
   return this._http.put(this.updatetaskbyid+"/"+item.TaskId,item).pipe(
   map((response: Response)=><Task[]>response.json()));
  }
AddUser(item:User):Observable<any>
{
  return this._http.post(this.Addnewuser,item).pipe(
  map((response: Response)=><any>response.json()));
}
Addproject(item:Project):Observable<any>
{
  return this._http.post(this.Addnewproject,item).pipe(
  map((response: Response)=><any>response.json()));
}
AddTask(item:Task):Observable<any>
{
  return this._http.post(this.Addnewtask,item).pipe(
  map((response: Response)=><any>response.json()));
}
AddParentTask(item:Parenttask):Observable<any>
{
  return this._http.post(this.Addnewparenttask,item).pipe(
  map((response: Response)=><any>response.json()));
}
Deleteuser(Id:number){
  return this._http.delete(this.Deleteuserrecord+"/"+Id).pipe(
  map((response: Response)=><any>response.json()));
}
Deleteproject(Id:number){
  return this._http.delete(this.Deleteprojectrecord+"/"+Id).pipe(
  map((response: Response)=><any>response.json()));
}
Deletetask(Id:number){
  return this._http.delete(this.Deletetaskrecord+"/"+Id).pipe(
  map((response: Response)=><any>response.json()));
}
Search(Id:number):Observable<User>{
  return this._http.get(this.Getbyuserid+"/"+Id).pipe(
  map((response: Response)=><User>response.json()));
}
Searchproject(Id:number):Observable<Project>{
  return this._http.get(this.Getbyprojectid+"/"+Id).pipe(
  map((response: Response)=><Project>response.json()));
}
Searchuser(Id:number):Observable<User>{
  return this._http.get(this.Getbyuserid+"/"+Id).pipe(
  map((response: Response)=><User>response.json()));
}
// Searchtask(Id:number):Observable<Task>{  
//   return this._http.get(this.Getbytaskid+"/"+Id)
//     .map((response: Response)=><Task>response.json()); 
//  //return this.tasksubject;  
// }
Searchtask(Id:number):Observable<Task>{  
  return this._http.get(this.Getbytaskid+"/"+Id).pipe(
  map((response: Response)=><Task>response.json()));
   // .map(this.extractData); 
 //return this.tasksubject;  

}
// private extractData(res: Response) {
//   let body = <Task> res.json();
//   console.log("Body Data = "+body.ProjectName);
//   return body || new Task() ;
// }
EndTask(Id:Number):Observable<Task>
{
  return this._http.put(this.Updateendrecord+"/"+Id,Id).pipe(
  map((response:Response)=><Task>response.json()));
}
Suspendproject(Id:number)
{
  return this._http.put(this.Updatesuspendrecord+"/"+Id,Id).pipe(
  map((response:Response)=><Project>response.json()));  
}
}
