import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';


import { FormserviceService } from '../formservice.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  global = false;
  up = false;
  add = true;
  user_detail: any;
  imageSrc: any;
  updateimg = true;
  detail = {
    first_name: "",
    last_name: "",
    email: "",
    phonenumber: 0,
    id: 0,
  }
  registerform!:FormGroup;

  // detail : etail_user = new detail_user;
  constructor(private fb: FormBuilder, private http: FormserviceService) { }
  



  ngOnInit(): void {
    this.getalluser();
    this.forkjoin1();
    this.createForm();
    console.log(this.registerform)
  }

  createForm(){
    this.registerform = this.fb.group({
      firstname: ["", [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      lastname: ["", [Validators.required],Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      email: ["", [Validators.required, Validators.email]],
      number: [""],
    })
  }
  userdata() {
    console.log(this.registerform.value)
  }
 
  postdetail() {
     let formValue=this.registerform.value;
     this.detail.first_name = formValue.firstname.trim();
     this.detail.last_name = formValue.lastname.trim();
     this.detail.email = formValue.email.trim()
     this.detail.phonenumber =  formValue.number.trim();
   
    this.http.postdata(this.detail).subscribe((res) => {
      console.log(res);
      
      this.user_detail.unshift(res);
      this.user_detail[0].avatar = this.imageSrc;
      console.log(this.user_detail, res, "hiiiiiiiii");
      alert("user added succesfully");
      this.registerform.reset();
      this.imageSrc = '';
    }, error => {
      alert("somthing worng");
    });

  }

  getalluser() {
    this.http.getdata().subscribe(res => {
      this.user_detail = res;
      //  this.user_detail=this.imageSrc;
      console.log(this.user_detail);
    })
  }

  deletedata(index: any, data: any) {
    if (confirm("Are you delete the user")) {
      this.user_detail.splice(index, 1);
      console.log(data, "delete");
      this.http.deletedata(data).subscribe(res => {
      })
    }
  }

  onupdate(data: any) {
    this.global = true;
    this.up = true;
    this.add = false;
    this.updateimg = false;
    this.detail.id = data.id;
    this.registerform.controls["firstname"].setValue(data.first_name);
    this.registerform.controls["lastname"].setValue(data.last_name);
    this.registerform.controls["email"].setValue(data.email);
  }
  edituser() {
    this.global = false;
    this.detail.first_name = this.registerform.value.firstname;
    this.detail.last_name = this.registerform.value.lastname;
    this.detail.email = this.registerform.value.email
    this.detail.phonenumber = this.registerform.value.number;
    this.http.updatedata(this.detail, this.detail.id).subscribe(res => {

      console.log(res);
      this.user_detail.find((item: any) => {
        if (item.id == res.id) {
          item.first_name = res.first_name;
          item.last_name = res.last_name;
          item.email = res.email;
          item.phonenumber = res.phonenumber;
          //  console.log(
          //    item[item.id-1].avatar=this.imageSrc);
          alert(" user information update successfully")
          console.log(item);
          this.registerform.reset();
        }

      })
    })
  }


  forkjoin1() {
    let request1 = this.http.getdata();
    let request2 = this.http.getdata();
    forkJoin([request1, request2]).subscribe((res: any) => {
      console.log(res);



    })
  }
  readURL(event: any) {
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }


}



