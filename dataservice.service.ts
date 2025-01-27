import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  apiUrl:string='https://projectapi.gerasim.in/api/BusBooking/'

  constructor(private http :HttpClient) { }

  getLocations():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+"GetBusLocations")
  }

  searchbus(from :string ,to:string,travelDate:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}searchBus?fromLocation=${from}&toLocation=${to}&travelDate=${travelDate}`)
  }

  getSceduelbyid(id:string):Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + "GetBusScheduleById?id="+id)
  }

  getbookseats(id:any){
    return this.http.get<any[]>(this.apiUrl+"getBookedSeats?shceduleId="+id)
  }
  OnRegisterUser(obj :any){
    return this.http.post<any[]>(this.apiUrl+"AddNewUser",obj)
  }
  onBooking(obj :any){
    return this.http.post<any[]>(this.apiUrl+"PostBusBooking",obj)
  }
}
