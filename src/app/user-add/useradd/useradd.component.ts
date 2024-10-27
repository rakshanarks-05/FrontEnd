import { Component } from '@angular/core';
import { UserService } from '../../User-Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../../user-List/list/user-list/user-list.component';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrl: './useradd.component.css'
})
export class UseraddComponent {



adduserForm:FormGroup;
 Users:user[]=[]
// address: any;




  constructor(private UserService:UserService,private fb:FormBuilder,private router:Router){
    this.adduserForm=this.fb.group({
      nic:['',[Validators.required]],
      firstName:[''],
      lastName:[''],
      email:[''],
      password:['',[Validators.required]],
      address:this.fb.group({
        addressline1:[''],
        addressline2:[''],
        city:['']
      })
    })
  }

  user:any;

  onAdduser(){
    this.user=(this.adduserForm.value)
    this.UserService.PostUser(this.user).subscribe(data=>{
      this.router.navigate(['/userList'])
    })
  }

  cancel(){
    this.router.navigate(['userList']);
  }

}
