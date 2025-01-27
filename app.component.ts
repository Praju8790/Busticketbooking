import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DataserviceService } from './service/dataservice.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'busticketbooking';
  isLoginForm :boolean =true
  logedindata:any;
  data =inject(DataserviceService)

  registerObj: any={
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "role": "",
    "createdDate": new Date(),
    "password": "",
    "projectName": "",
    "refreshToken": "",
    "refreshTokenExpiryTime": new Date()
  }

  constructor (){
    const localuser = localStorage.getItem("redbus")
    if(localuser != null){
      this.logedindata =JSON.parse(localuser)
    }
  }
  openModel(){
    const model =document.getElementById('myModal')
    if(model != null){
      model.style.display ='block'
    }
  }
  closeModel(){
    const model =document.getElementById('myModal')
    if(model != null){
      model.style.display ='none'
    }
  }

  regsitor(){
    this.data.OnRegisterUser(this.registerObj).subscribe((res:any)=>{
      alert("User Registed Sucess")
      this.registerObj ='',
      localStorage.setItem("redbus",JSON.stringify(res.data));
      this.logedindata =res.data
      this.closeModel()
    },error=>{
      alert(JSON.stringify(error))
    })
  }

  logoff(){
    localStorage.removeItem('redbus')
    this.logedindata=undefined
  }
}
