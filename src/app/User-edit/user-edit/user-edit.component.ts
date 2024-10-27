import { Component, OnInit } from '@angular/core';
import { UserService } from '../../User-Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  UserForm:FormGroup;
  UID:number;


  constructor(private fb:FormBuilder , private userService:UserService , private router:Router ,private rout:ActivatedRoute, private toastr: ToastrService){
    this.UserForm = this.fb.group({
      id:[''],
      nic:['',[Validators.required]],
      firstName:[''],
      lastName:[''],
      email:[''],
      password:['',[Validators.required]]
    })

    this.UID = Number(rout.snapshot.paramMap.get('id'));
  
  }

  ngOnInit(): void {
      this.userService.getUserById(this.UID).subscribe((data) => {
        console.log(data)
        this.UserForm.setValue(data);
      }, error => {
        this.toastr.warning("User : " + error.error.title , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
      });
  }

  onSubmit(){
      let User = this.UserForm.value;
      User.id = this.UID;
      this.userService.updateUser(this.UID,User).subscribe((data) => {
        this.toastr.success("User Update Successfully.." , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
        
      })    
      this.router.navigate(['/userList']);
  }

  cancel(){
    this.router.navigate(['userList'])
  }

}
