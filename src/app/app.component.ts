import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as $ from 'jquery';
import { Titles } from 'src/app/models/titles';
import { User } from './models/user';
import {Title} from '@angular/platform-browser'
import { TitleService } from './services/titleservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  header:string;  
  title='';
  taskid='';
  constructor (private _service:TitleService){
  //this._service.title();
  }
  ngOnInit()
  {   
      this._service.title.subscribe(title => {this.title = title});      
    
    //this.title.usertitle=
    $(document).ready(function(){        
       $('a').click(function(){        
       $('a').removeClass('selected');
       $(this).addClass('selected');                 
     });        
    // $('#adduser').click(function(){      
    //  //console.log(($('btnadd')).val());
    //   $('#user').toggle();
    //   $('#task').hide();
    //   $('#project').hide();
    //   $('#vtask').hide();
    //   //this.head();
    // });  
    // $('#addtask').click(function(){      
    //   $('#user').hide();
    //   $('#task').toggle();
    //   $('#project').hide();
    //   $('#vtask').hide();
    // });
    // $('#addproject').click(function(){      
    //   $('#user').hide();
    //   $('#task').hide();
    //   $('#project').toggle();
    //   $('#vtask').hide();        
    // });
    // $('#viewtask').click(function(){      
    //   $('#user').hide();
    //   $('#task').hide();
    //   $('#project').hide();
    //   $('#vtask').toggle();
    // });
    // $('#update').click(function(){      
    //   $('#user').toggle();
    // });
    // $('#adduser').click(function(){      
    //   $('#user').toggle();
    // }); 
    
  });
}
}