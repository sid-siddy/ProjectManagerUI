import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Router } from '@angular/router';
//import $ from 'jquery';
declare var $:any;
//import * as $AB from 'jquery';
//declare var jQuery: jquery;
import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
import uiselect from 'ui-select';
import { TitleService } from 'src/app/services/titleservice';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/sharedservice';
import { User } from 'src/app/models/user';
import { isNgTemplate } from '@angular/compiler';
import { ValueTransformer } from '@angular/compiler/src/util';
import{Location} from '@angular/common';
import { iif } from 'rxjs';
import { Variable } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-addproject',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddprojectComponent implements OnInit {
  display='none';
  logedInForm:FormGroup;
item:Project;item1:Project;itemuser:User;
//checked:boolean;
Recordadded:string;
today:Date;
 _this:this;
drpdwnvalue:string;
objarray:any=[];
projects:Project[];projects1:Project[];users:User[];
msg:string;mngrId:number;
usersfilter:User[];empidfiler:string;empfiler:Project[];
daystring1:String;daystring2:String;
st:Boolean;st1:Boolean;
ProjectName:string;
config = {
  displayKey:"FirstName",//if objects array passed which key to be displayed defaults to description,
  search:true //enables the search plugin to search in the list
  }
  constructor(private _router:Router,private _title:TitleService, private _service:SharedService,private location:Location) { 
    this.item=new Project(); 
    this.item1=new Project();   
    this._service.GetAllProjects().subscribe(i=>this.projects=i);
    this._service.GetAllusers().subscribe(i=>this.users=i);
    this._service.GetAllProjects().subscribe(i=>this.projects1=i);    
    $(function () {
      $('#txtchkbox').change(function(){
         this.st=this.checked;       
        if(this.st){   
          
          $('#ptxtstartdate').prop("disabled",false);
          $('#ptxtenddate').prop("disabled",false);
          $('#ptxtstartdate').show();
          $('#ptxtstartdate1').hide();
          $('#ptxtenddate').show();
          $('#ptxtenddate1').hide();
          this.today=new Date();
          var year=new Date().getFullYear();
          var month=new Date().getMonth()+1;
          if (month<10){
            month=0 + month;
            };                
          var day1=new Date().getDate();
          var day2=new Date().getDate()+1;                      
          this.daystring1=day1.toString();
          this.daystring2=day2.toString();
          if(day1<10)
          {this.daystring1="0"+this.daystring1;}
          if(day2<10)
          {this.daystring2="0"+this.daystring2;}        
          
            $('#ptxtstartdate').val(year + "-" + month + "-" + this.daystring1);
            $('#ptxtenddate').val(year + "-" + month + "-" + this.daystring2);
            
        } 
        else{                
          $('#ptxtstartdate').prop("disabled",true);
          $('#ptxtenddate').prop("disabled",true);          
      }  
  });
  $('#btntaskmanagersearch').click(function() {
    $('#searchmodal').show();
  });
  });
}
  ngOnInit() {
    
    this.logedInForm = new FormGroup({
      countryCode: new FormControl("countryCode",
        Validators.compose([
          Validators.required
          //Validators.pattern("[^ @]*@[^ @]*")
      ]))});
    this._title.setTitle('ADD PROJECT');
     $('#ptxtstartdate').prop("disabled",true);
     $('#ptxtenddate').prop("disabled",true);
     $('#drpsearch').addClass("disabled");
   //  $('#txtManager').val(''); 
  
  }
Add(){

   if(($('#txtProject').val()=='') || ($('#Priority').val()=='')|| ($('#txtManager').val()==''))
   {
         if($('#txtProject').val()=='')
        {
            this.Recordadded="Enter Project Name";
        }  
         else if($('#Priority').val()=='')
        {
        this.Recordadded="Select Priority";      
        } 
          else if($('#txtManager').val()=='')
        {
        this.Recordadded="Select Manager";           
        }
   }
   else if($('#txtchkbox').is(':checked')) 
     {      
        if($('#ptxtstartdate').val()=='')
        {        
           this.Recordadded='Enter start date';    
        }
        else  if($('#ptxtenddate').val()=='')
        {
          this.Recordadded='Enter end date';
        }
        else if ($('#ptxtstartdate').val()>=$('#ptxtenddate').val())
        {      
           this.Recordadded='End date should be greater than start date';
        }
        
        else{
          this.Additionofnewproject();
        }
      }  
     else{      
      this.Additionofnewproject();
     }
}
Additionofnewproject(){
   this.item.PStartDate = $('#ptxtstartdate').val();
   this.item.PEndDate = $('#ptxtenddate').val();
  this.item.ManagerId=this.objarray.UserId;    
  this.item.PPriority=$('#Priority').val();
  this._service.Addproject(this.item).subscribe(suc => 
      {
        this._service.GetAllProjects().subscribe(i=>this.projects=i);
      });                
  this.Reset();   
  this.Recordadded="Record added successfully";  
}
Reset(){
  $('#txtProject').val('');
  $('#Priority').val('');
  this.item.PStartDate=null;
  this.item.PEndDate=null;
  $('#ptxtstartdate').val('');
  $('#ptxtenddate').val('');
  $('#txtManager').val(''); 
  $("#txtchkbox").prop("checked", false);
  this.Recordadded='';
  this.location.replaceState('adduser');   
  $('#btnadd').show();
  $('#btnupdate1').hide();
  this.objarray=[];
  this._title.setTitle('ADD USER'); 
}
StartDate(){
  this.projects.sort(function(a,b){    
    if(new Date(a.PStartDate)<new Date(b.PEndDate))
    return -1;      
  });
}
EndDate(){
  this.projects.sort(function(a,b){    
   if(new Date(a.PEndDate)<new Date(b.PEndDate))
    return -1; 
  });
}
Priority(){
  this.projects.sort(function(a,b){
    var PriorityA=a.PPriority;
    var PriorityB=b.PPriority;
    if(PriorityA<PriorityB)
    return -1; 
  });
}
Completed(){
  this.projects.sort(function(a,b){
    var CompletedA=a.completed;
    var CompletedB=b.completed;
    if(CompletedA<CompletedB)
    return -1; 
  });
}
Edit(id:number){
    $('#btnadd').hide();
    $('#btnupdate1').show();       
    $('#ptxtstartdate').hide();
    $('#ptxtstartdate1').show();
    $('#ptxtenddate').hide();
    $('#ptxtenddate1').show(); 
    this.Recordadded='';   
    this._title.setTitle('UPDATE POJECT');    
    this.location.replaceState('/updateproject/'+id);
    this._service.Searchproject(id).subscribe(i=>{
    this.item=i,         
    $('#txtProject').val(this.item.ProjectName);
    $('#Priority').val(this.item.PPriority);
    $('#ptxtstartdate1').val(this.item.PStartDate);
    $('#ptxtenddate1').val(this.item.PEndDate);     
    this._service.Searchuser(this.item.ManagerId)
    .subscribe(i=>{this.itemuser=i
      if(this.item.ManagerId==0)
      {
        $('#txtManager').val('');
      }
      else{
      $('#txtManager').val(this.itemuser.FirstName);       
      }    
    }); 
    });  
}
openModal(){
  this.display='block';  
  $('#projectdiv :input').attr('disabled', true);
}
onCloseHandled(){   
  this.display='none';    
  $('#projectdiv :input').removeAttr('disabled', false);
}
mdfLogin(data){  
  this.display = 'none';
   }
   selectionchanged(){    
     //debugger     
      $('#txtManager').val(this.objarray.FirstName);    
      this.item.ManagerId=this.objarray.UserId;    
      
    }
  Update(){    
    if(($('#txtProject').val()=='') || ($('#Priority').val()=='')|| ($('#txtManager').val()==''))
   {
         if($('#txtProject').val()=='')
        {
            this.Recordadded="Enter Project Name";
        }  
         else if($('#Priority').val()=='')
        {
        this.Recordadded="Select Priority";      
        } 
          else if($('#txtManager').val()=='')
        {
        this.Recordadded="Select Manager";           
        }
   }
   else if($('#txtchkbox').is(':checked')) 
     {      
        if($('#ptxtstartdate').val()=='')
        {        
           this.Recordadded='Enter start date';    
        }
        else  if($('#ptxtenddate').val()=='')
        {
          this.Recordadded='Enter end date';
        }
        else if ($('#ptxtstartdate').val()>=$('#ptxtenddate').val())
        {      
           this.Recordadded='End date should be greater than start date';
        }
    else{         
      this.updaterecord();
  }
  }
  else{
    this.updaterecord();
  }
}
updaterecord(){
  $('#btnadd').show();
  $('#btnupdate1').hide();    
  $('#btnreset').prop("disabled",false);
  $('#ptxtstartdate').show();
  $('#ptxtstartdate1').hide();
  $('#ptxtenddate').show();
  $('#ptxtenddate1').hide();
  this.location.replaceState('addproject');
  this._title.setTitle("ADD PROJECT");
  if($('#txtchkbox').is(':checked'))
  {
   
    this.item.PStartDate = $('#ptxtstartdate').val();
    this.item.PEndDate = $('#ptxtenddate').val();   
  }
  else
  {
  this.item.PStartDate = $('#ptxtstartdate1').val();
  this.item.PEndDate = $('#ptxtenddate1').val();
  }
 
     this._service.EditProject(this.item)
.subscribe(i=>
 {
   this._service.GetAllProjects().subscribe(j=>this.projects=j);
 });
     this.Reset();
     this.Recordadded='Record updated successfully';
  }
  Suspendcontinue(id:number){
    this._service.Suspendproject(id)
    .subscribe(i=>
      {
        this._service.GetAllProjects().subscribe(j=>this.projects=j);
      }); 
    };  
    Searchbyproject(projectname:string)
  {   
    this._service.GetAllProjects().subscribe(i=>this.projects1=i);
    this.projects=this.projects1.filter(i=>i.ProjectName.toString().toUpperCase().startsWith(projectname.toString().toUpperCase()));    
  }        
}
