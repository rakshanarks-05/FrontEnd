import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './Task-List/list/list.component';
import { User } from './User-Service/user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskurl="http://localhost:5102/api/TaskItems"

  constructor(private  http:HttpClient) {


   }

   getTask(){
      return this.http.get<any[]>(this.taskurl)
   }

   createTask( task:Task){
    return this.http.post(this.taskurl ,task)
   }

   DeleteTask(id:number){
    return this.http.delete(this.taskurl +"/"+id )
   }

   getTaskbyId(taskId:number){
    return this.http.get<Task>(this.taskurl +"/"+taskId)
   }

   edittask(task:Task){
    return this.http.put(this.taskurl+"/"+task.id,task)
   }




}
export interface task{
  id:number,
  title:string,
  description:string,
  dueDate:Date,
  Priority:string,
  assignee:User


}
