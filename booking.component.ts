import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from '../../service/dataservice.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  scheduleId: any = 0;
  scheduledata: any;
  scheduledatas: any[]=[];
  abvlableseats: any[]=[];
  seatArray: number[] = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private data: DataserviceService
  ) {
    this.activateRoute.params.subscribe((res: any) => {
      this.scheduleId = res.id;
      this.getScheduleDetailslById();
      this.getSeatsbooked()
    });
  }

  ngOnInit(): void {}

  getScheduleDetailslById() {
    this.data.getSceduelbyid(this.scheduleId).subscribe((res: any) => {
      this.scheduledata = res;
      for (let index = 1; index <= this.scheduledata.totalSeats; index++) {
        this.seatArray.push(index)
      }
    });
  }

  getSeatsbooked() {
    this.data.getbookseats(this.scheduleId).subscribe((res: any) => {
      this.scheduledatas = res;
     
    });
  }

  checkIfSeat(seatnumber:string){
    return this.scheduledatas.indexOf(seatnumber)
  }


  selectSeat(seatbook:any){
    return this.scheduledatas.push(seatbook)
  }

  booknow(){
    const loogeduserdata =localStorage.getItem('redbus')
    if(loogeduserdata){
      const loodata =JSON.parse(loogeduserdata)

      const obj={
        "bookingId": 0,
        "custId": loodata.userId,
        "bookingDate": new Date(),
        "scheduleId": 0,
        "BusBookingPassengers": this.seatArray
      }
      this.data.onBooking(obj).subscribe((res:any)=>{
        alert("Booking is Success")
      })
    }
   else{
    alert('Please Login')
   }
  }
  selectSeats(){

  }
}
