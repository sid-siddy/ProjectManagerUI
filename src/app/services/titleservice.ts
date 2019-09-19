import { Injectable } from '@angular/core';
import { Title  } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  public title = new BehaviorSubject('');
  public taskid = new BehaviorSubject('');
  public parentid = new BehaviorSubject('');
  //Taskidget:number;
  constructor() {}
     setTitle(title) {
      //  console.log(this.title.value);
      //  console.log(title);      
       this.title.next(title);
   }
   settaskid(taskid){
     this.taskid.next(taskid);     
   }  
}

