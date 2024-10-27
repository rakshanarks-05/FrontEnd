import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../User-Service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  user:user[]=[];
  searchUser:string=''

  constructor(private UserService:UserService ,private tostr:ToastrService,private router:Router){

  }

  ngOnInit(): void {
   this.listUser();
  }

  ondelete(id:number){
    if(confirm("Do you Want delete")){
      this.UserService.DeleteByid(id).subscribe(data=>{
        this.tostr.success('task deleted')
      })
    }
  }

  gotoEdit(id:number){
    this.router.navigate(['/user-edit',id])
  }

  listUser(){
    this.UserService.getuser().subscribe(data=>{
      this.user=data;      
    })
  }

  deleteUser(id:number){
    if(confirm("Do you want to delete ?")){
      this.UserService.DeleteByid(id).subscribe((data) => {
        this.tostr.success('Deleted Successfully.')
        this.listUser();
      })      
    }
  }

}

export interface user{
address: any;

  id:number,
  nic:string,
  firstName:string,
  lastName:string,
  email:string,
  password:string
}
