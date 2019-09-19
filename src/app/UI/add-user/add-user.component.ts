import { Component, OnInit,inject } from '@angular/core';
import {User} from 'src/app/models/user';
import { SharedService } from 'src/app/services/sharedservice';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup , FormsModule} from '@angular/forms';
import { Titles } from 'src/app/models/titles';
//import { $ } from 'protractor';
import * as $ from 'jquery';
import { TitleService } from 'src/app/services/titleservice';
import { Project } from 'src/app/models/project';
import {Location} from '@angular/common';

@Component({
  selector: 'app-adduser',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AdduserComponent implements OnInit {
  item:User; item1:Project;
  users:User[]; users1:User[];
  Recordadded:string;  
  updateuserid:number; FirstName:string;
  msg:string; empexist:number;
  constructor(private _service:SharedService, private _router:Router,private _title:TitleService, private _active:ActivatedRoute, private location:Location) {
    this.item=new User();
    //list=[{}]      
    //this._active.params.subscribe(k=>this.updateuserid=k['UserId']);    
    this._service.GetAllusers().subscribe(i=>this.users=i);
    this._service.GetAllusers().subscribe(i=>this.users1=i);    
   }
   
   ngOnInit() {
    this._title.setTitle('ADD USER');   
  }  
  Add(){
    if($('#txtFirstName').val()=='')
    {
      this.Recordadded="Enter first name";
    }
    else if($('#txtLastName').val()=='')
    {
      this.Recordadded="Enter Last name";
    }
    else if($('#txtEmpId').val()=='')
    {
      this.Recordadded="Enter Employee Id";
    } 
     
    else{      
      // Need to add data into database
      this.Isuserexist();     
      if(this.empexist==0){
      this._service.AddUser(this.item)
      .subscribe(suc => 
        {
          this._service.GetAllusers().subscribe(i=>this.users=i);
         });       
      console.log(this.msg);
      this.Reset();      
      this.Recordadded='Record added successfully';      
        }
        else
        {
          this.Recordadded='Employee Id already exists in database';
        }
    }
  }
  Isuserexist(){
    var empid=($('#txtEmpId').val());        
    console.log(this.users1.length);
    this.users=this.users1.filter(i=>i.EmployeeId==empid);
    console.log(this.users.length);
    if(this.users.length==0)
    {
      this.empexist=0;
    }
    else{
      this.empexist=1;
    }
  }
  Reset(){    
    $('#txtFirstName').val('');
    $('#txtLastName').val('');
    $('#txtEmpId').val('');
    this.Recordadded='';
    //this._router.navigateByUrl('adduser');
    this.location.replaceState('adduser');   
    $('#btnadd').show();
    $('#btnupdate').hide();
    this._title.setTitle('ADD USER'); 
  }
  Edit(id:number){  
      
   this.location.replaceState('/updateuser/'+id);   
   this._service.Search(id).subscribe((i)=>{
     this.item=i;
     $('#txtEmpId').val(this.item.EmployeeId);
     $('#txtFirstName').val(this.item.FirstName);
     $('#txtLastName').val(this.item.LastName);
    }); 
    
    $('#btnadd').hide();
    $('#btnupdate').show();
    $('#btnreset').prop("disabled",true); 
     
    this._title.setTitle('UPDATE USER');        
  }  
  Delete(Id:number){
    this.Recordadded = 'Record deleted successfully';
    this._service.Deleteuser(Id).subscribe(
      suc => 
      {
        this.users = this.users.filter((e) =>{
          return e.UserId !== Id;
        });
      }
    );
  }
  Searchbyfirstname(firstname:string)
  {
    //console.log("entered")
    this._service.GetAllusers().subscribe(i=>this.users1=i);
    this.users=this.users1.filter(i=>i.FirstName.toString().toUpperCase().startsWith(firstname.toString().toUpperCase()));
    //this.users1=this.users.filter(i=>i.FirstName.startsWith(firstname));
  
  }
  FirstNameClick(){    
    this.users.sort(function(a,b){
      var firstnameA=a.FirstName.toLowerCase();
      var firstnameB=b.FirstName.toLowerCase();
      if(firstnameA<firstnameB)
      return -1;   
    });
  }
    LastNameClick(){      
      this.users.sort(function(a,b){
        var lastnameA=a.LastName.toLowerCase();
        var lastnameB=b.LastName.toLowerCase();
        if(lastnameA<lastnameB)
        return -1;        
      });      
  }
  EmployeeId(){    
    this.users.sort(function(a,b){
      var empIdA=a.EmployeeId.toLowerCase();
      var empIdB=b.EmployeeId.toLowerCase();
      if(empIdA<empIdB)
      return -1;      
    });  
  }

  Update(){
   
    if($('#txtFirstName').val()=='')
    {
      this.Recordadded="Enter first name";
    }
    else if($('#txtLastName').val()=='')
    {
      this.Recordadded="Enter Last name";
    }
    else if($('#txtEmpId').val()=='')
    {
      this.Recordadded="Enter Employee Id";
    }   
    else{   
      this.Isuserexist();     
      if(this.empexist==0 || this.item.EmployeeId==$('#txtEmpId').val()){         
       this._service.EditUser(this.item)
            .subscribe(i=>
            {
             this._service.GetAllusers().subscribe(j=>this.users=j);
        });
      this.Reset();
      this.Recordadded='Record Updated successfully';
      this.location.replaceState('adduser');   
      $('#btnadd').show();
      $('#btnupdate').hide();
      this._title.setTitle('ADD USER'); 
      }
      else
      {
        this.Recordadded='Employee Id already exists in database';
      }
    }
  }
  validations()
  {
     
  }  
}