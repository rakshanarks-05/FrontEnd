import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {


  addtaskForm:any;
Users: any;
value: any;

  constructor( private Taskserive:TaskService,private fb:FormBuilder,private router:Router){
    this.addtaskForm=this.fb.group({
      title:['',[Validators.required]],
      description:[''],
      dueDate:[''],
      Priority:['',[Validators.required]],
      assigneeId:['']
    })

  }

  task:any;


  onAddTask(){
    this.task=(this.addtaskForm.value);
    this.Taskserive.createTask(this.task).subscribe(data=>{
      this.router.navigate(['/'])
    })
  } 

  
  cancel(){

  }
}
