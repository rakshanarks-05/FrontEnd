import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

Task:Task []=[];

search:string=""


constructor( private TaskService:TaskService,private toastr:ToastrService){


}
  ngOnInit(): void {
    this.listTask();
  }

  listTask(){
    this.TaskService.getTask().subscribe(data=>{
      this.Task=data;
      console.log(data);
      
    })
  }
  ondelete(taskid:number){

    if(confirm("Do you want Delete ! ..")){
      this.TaskService.DeleteTask(taskid).subscribe(data=>{
        this.toastr.success("Task is deleted ","Deleted",{
          closeButton:true,
          timeOut:10000
        })
      }
    )
    this.listTask();
    }

    this.TaskService.getTask().subscribe(data=>{
      this.Task=data;
    })


  }
  

}

export interface Task{
assignee: any;
  id:number,
  title:string,
  description:string,
  dueDate:Date,
  priority:string
}
