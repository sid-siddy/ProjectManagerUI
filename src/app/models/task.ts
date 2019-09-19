export class Task {
    TaskId:number;
    ParentId:number;
    ProjectId:number;
    TaskName:string;
    TStartDate:Date;
    TEndDate:Date;
    TPriority:number;
    TStatus:boolean;
  //  IsParentTask:boolean;
    ParentTaskName:string;
    ProjectName:string;
    UserId:number;
    Manager:string;
}
